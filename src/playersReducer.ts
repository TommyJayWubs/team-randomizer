import { shuffle } from "./utils"

export type Player = {
  id: number,
  name: string
}

export type PlayersState = {
  nextId: number,
  players: Player[]
}

export const initial : PlayersState = {
  nextId: 0,
  players: []
}

export type PlayersAction = 
  {type: 'add', name: string} | 
  {type: 'remove', id: number} |
  {type: 'set', id: number, name: string} |
  {type: 'shuffle'}

export function playersReducer(state: PlayersState, action: PlayersAction) : PlayersState {
  switch(action.type) {
    case 'add':
      const player = {id: state.nextId, name: action.name}
      return {
        nextId: state.nextId + 1,
        players: state.players.concat(player)
      }
    case 'remove':
      return {
        ...state,
        players: state.players.filter(x => x.id != action.id)
      }
    case 'set':
      return {
        ...state,
        players: state.players.map(x => x.id == action.id 
          ? {...x, name: action.name} 
          : x)
      }
    case 'shuffle':
      return {
        ...state,
        players: shuffle(state.players)
      }     
  }
}