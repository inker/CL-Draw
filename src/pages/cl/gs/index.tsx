import * as React from 'react'
import styled from 'styled-components'
import { shuffle } from 'lodash'

import { GSTeam as Team } from 'utils/team'
import getPossibleGroups from './possible-groups'
import animateContentTransfer from 'utils/animateContentTransfer'

import PotsContainer from 'components/PotsContainer'
import GroupsContainer from 'components/GroupsContainer'
import TablesContainer from 'components/TablesContainer'
import BowlsContainer from 'components/BowlsContainer'
import TeamBowl from 'components/TeamBowl'
import GroupBowl from 'components/GroupBowl'
import Announcement from 'components/Announcement'

const Root = styled.div`
  display: flex;
  margin: auto;
  width: 1000px;
`

interface Props {
  pots: Team[][],
}

interface State {
  initialPots: Team[][],
  pots: Team[][],
  groups: Team[][],
  maxTeamsInGroup: number,
  airborneTeams: Team[],
  currentPotNum: number,
  pickedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  possibleGroups: number[] | null,
  possibleGroupsShuffled: number[] | null,
  completed: boolean,
  error: string | null,
}

export default class GS extends React.PureComponent<Props, State> {

  componentDidMount() {
    this.reset()
  }

  protected reset = () => {
    const initialPots = this.props.pots
    const currentPotNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    this.setState({
      initialPots,
      pots,
      groups: currentPot.map(team => []),
      maxTeamsInGroup: pots.length,
      airborneTeams: [],
      currentPotNum,
      pickedTeam: null,
      pickedGroup: null,
      hungPot: currentPot,
      possibleGroups: null,
      possibleGroupsShuffled: null,
      completed: false,
      error: null,
    })
  }

  private onTeamBallPick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const {
      groups,
      pots,
      currentPotNum,
    } = this.state
    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const i = currentPot.findIndex(team => team.id === ball.dataset.teamid)
    const pickedTeam = currentPot.splice(i, 1)[0]
    const possibleGroups = getPossibleGroups(pots, groups, pickedTeam, currentPotNum)
    this.setState({
      hungPot,
      pickedTeam,
      possibleGroups,
      possibleGroupsShuffled: shuffle(possibleGroups),
      pickedGroup: null,
    })
  }

  private onGroupBallPicked = (ev: React.MouseEvent<HTMLDivElement>) => {
    const ball = ev.target as HTMLDivElement
    const pickedGroup = +(ball.dataset.group || 0)
    const { state } = this
    const {
      groups,
      airborneTeams,
      pickedTeam,
      pots,
      currentPotNum,
      completed,
    } = state
    if (!pickedTeam) {
      this.setState({
        error: 'shit',
      })
      return
    }
    // const promise = animateContentTransfer()
    const fromCell = document.querySelector(`[data-cellid='${pickedTeam.id}']`) as HTMLElement
    if (!fromCell) {
      throw new Error('cell not found')
    }
    const toCell = document.querySelector(`[data-cellid='${String.fromCharCode(65 + pickedGroup)}${currentPotNum}']`) as HTMLElement
    if (!toCell) {
      throw new Error('cell not found')
    }
    const promise = animateContentTransfer(fromCell, toCell, 300)
    groups[pickedGroup].push(pickedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1
    airborneTeams.push(pickedTeam)
    this.setState({
      pickedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
      airborneTeams,
    }, async () => {
      await promise
      this.setState({
        airborneTeams: this.state.airborneTeams.filter(team => team !== pickedTeam),
      })
    })
  }

  render() {
    if (!this.state) {
      return null
    }
    const {
      initialPots,
      pots,
      groups,
      maxTeamsInGroup,
      currentPotNum,
      hungPot,
      airborneTeams,
      pickedTeam,
      pickedGroup,
      possibleGroups,
      possibleGroupsShuffled,
      completed,
    } = this.state
    const possiblesText = possibleGroups ? possibleGroups.map(i => String.fromCharCode(65 + i)).join(', ') : ''
    return (
      <Root>
        <TablesContainer>
          <PotsContainer
            completed={completed}
            pickedTeam={pickedTeam}
            pots={initialPots}
            groups={groups}
          />
          <GroupsContainer
            maxTeams={maxTeamsInGroup}
            completed={completed}
            pickedTeam={pickedTeam}
            currentPotNum={currentPotNum}
            groups={groups}
            possibleGroups={possibleGroups}
            airborneTeams={airborneTeams}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            completed={completed}
            pickedTeam={pickedTeam}
            pot={hungPot}
            dontTouch={!!pickedTeam}
            onPick={this.onTeamBallPick}
          />
          <Announcement
            completed={completed}
            pickedTeam={pickedTeam}
            pickedGroup={pickedGroup}
            possiblesText={possiblesText}
            reset={this.reset}
          />
          <GroupBowl
            completed={completed}
            possibleGroups={possibleGroupsShuffled}
            onPick={this.onGroupBallPicked}
          />
        </BowlsContainer>
      </Root>
    )
  }
}
