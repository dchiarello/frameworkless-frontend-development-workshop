import template from './teams.template.html'
import teamTemplate from './team.template.html'
import { htmlToElement } from '../../utils/dom'

const createTeamElement = (team, actions) => {
  const element = htmlToElement(teamTemplate)
  element.querySelector('span').innerText = `${team.id} - ${team.name}`

  const ul = element.querySelector('ul')

  team.players.forEach(player => {
    const playerElement = htmlToElement(`<li>${player.name}<button>X</button></li>`)

    const onClick = () => {
      actions.removePlayer(team.id, player.id)
    }

    playerElement.querySelector('button').addEventListener('click', onClick)
    ul.appendChild(playerElement)
  })
  return element
}

export default (teams, actions) => {
  const teamListContainer = document.querySelector('div[role="team-list"]')

  teamListContainer.innerHTML = ''

  const teamList = htmlToElement(template)
  const teamNameInput = teamList.querySelector('input[role="team-name"]')

  const teamIdInput = teamList.querySelector('input[role="team-id"]')
  const playerIdInput = teamList.querySelector('input[role="player-id"]')

  teamList.querySelector('button[role="add"]').addEventListener('click', () => {
    actions.add(teamNameInput.value)
  })

  teamList.querySelector('button[role="add-player"]').addEventListener('click', () => {
    actions.addPlayer(parseInt(teamIdInput.value), parseInt(playerIdInput.value))
  })

  const ul = teamList.querySelector('ul')

  teams
  .forEach((team, index) => {
    ul.appendChild(createTeamElement(team, actions))
  })

  teamListContainer.appendChild(teamList)
}
