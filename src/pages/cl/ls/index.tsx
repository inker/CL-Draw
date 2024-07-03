import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { shuffle } from 'lodash';

import usePopup from '#store/usePopup';
import type Team from '#model/team/GsTeam';
import generatePairings from '#engine/dfs/ls/generatePairings/index';
import generateSchedule from '#engine/dfs/ls/generateSchedule/index';
import useAbortSignal from '#utils/hooks/useAbortSignal';
import Button from '#ui/Button';
import Portal from '#ui/Portal';
import Dots from '#ui/Dots';

import Schedule from './Schedule';
import MatchesTable from './MatchesTable';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  font-size: 14px;
`;

const MatrixWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

interface Props {
  pots: readonly (readonly Team[])[];
}

function LeagueStage({ pots: initialPots }: Props) {
  const numMatchdays = initialPots.length * 2;

  const numMatches = useMemo(() => {
    const numTeams = initialPots.flat().length;
    return (numTeams * numMatchdays) / 2;
  }, [initialPots, numMatchdays]);

  const [, setPopup] = usePopup();

  const [isMatchdayMode, setIsMatchdayMode] = useState(false);

  const [pairings, setPairings] = useState<(readonly [Team, Team])[]>([]);
  const [schedule, setSchedule] = useState<(readonly [Team, Team])[][]>(
    Array.from(
      {
        length: numMatchdays,
      },
      () => [],
    ),
  );
  const [isFixturesDone, setIsFixturesDone] = useState(false);

  const abortSignal = useAbortSignal();

  const pots = useMemo(
    () =>
      initialPots.map(pot =>
        pot.map(team => ({
          ...team,
          id: `${team.country}:${team.name}`,
        })),
      ),
    [initialPots],
  );

  const allTeams = useMemo(() => pots.flat(), [pots]);

  const matchdaySize = allTeams.length / 2;

  useEffect(() => {
    setPopup({
      waiting: false,
    });
  }, []);

  useEffect(() => {
    const formPairings = async () => {
      const generator = generatePairings({
        pots,
        numMatchdays: 8,
        isMatchPossible: (a, b) => a.country !== b.country,
        signal: abortSignal,
      });
      for await (const pickedMatch of generator) {
        setPairings(prev => [...prev, pickedMatch]);
      }
      setIsFixturesDone(true);
    };

    formPairings();
  }, []);

  useEffect(() => {
    if (isFixturesDone) {
      const formSchedule = async () => {
        // setIsMatchdayMode(true);
        // setSchedule(chunk(pairings, 18));
        const generator = generateSchedule({
          matchdaySize,
          allGames: pairings,
          currentSchedule: schedule,
          signal: abortSignal,
        });
        const iterator = await generator.next();
        if (iterator.done) {
          throw new Error('Cannot be fully done');
        }
        const it = iterator.value;
        setSchedule(it.solutionSchedule.map(md => shuffle(md)));
        setIsMatchdayMode(true);
      };

      formSchedule();
    }
  }, [isFixturesDone]);

  const isScheduleDone = useMemo(
    () => schedule.some(md => md.length > 0),
    [schedule],
  );

  return (
    <Root>
      <Portal
        tagName="div"
        modalRoot={document.getElementById('navbar-left-container')!}
      >
        <Button
          type="button"
          disabled={!isScheduleDone}
          onClick={() => {
            setIsMatchdayMode(prev => !prev);
          }}
        >
          {isMatchdayMode ? 'Display matrix' : 'Display schedule'}
        </Button>
      </Portal>
      {isMatchdayMode ? (
        <Schedule schedule={schedule} />
      ) : (
        <MatrixWrapper>
          <MatchesTable
            allTeams={allTeams}
            pairings={pairings}
          />
          <div>
            {isFixturesDone ? (
              <p>All {numMatches} matches have been drawn.</p>
            ) : (
              <p>
                Drawn matches: {pairings.length}/{numMatches}
              </p>
            )}
            {isFixturesDone && !isScheduleDone && (
              <p>
                Schedule creation in progress. This will take a while. Please do
                not close the page
                <Dots
                  initialNum={3}
                  maxNum={3}
                  interval={1000}
                />
              </p>
            )}
          </div>
        </MatrixWrapper>
      )}
    </Root>
  );
}

export default memo(LeagueStage);
