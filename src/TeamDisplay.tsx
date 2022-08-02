import { ChangeEvent, Dispatch } from "react"
import { Player, PlayersAction } from "./playersReducer"
import { useAutoAnimate } from '@formkit/auto-animate/react'

type PlayerDisplayProps = {
  player: Player,
  playersDispatch: Dispatch<PlayersAction>,
}

function PlayerDisplay({ player, playersDispatch }: PlayerDisplayProps) {
  return (
    <div className="justify-center">
      <input
        value={player.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          playersDispatch({ type: 'set', id: player.id, name: e.target.value })
        }} />
      <button
        onClick={() => playersDispatch({ type: 'remove', id: player.id })}
        className='small red'
      >
        -
      </button>
    </div>)
}

type TeamDisplayProps = {
  teamNumber: number,
  teamPlayers: Player[],
  playersDispatch: Dispatch<PlayersAction>,
}

export function TeamDisplay({teamNumber, teamPlayers, playersDispatch} : TeamDisplayProps) {
  const [parent] = useAutoAnimate<HTMLDivElement>()

  return (
    <div>
      <h3> Team {teamNumber} </h3>
      <div ref={parent}>
        {teamPlayers.map(player => 
          <PlayerDisplay 
            key={player.id} 
            player={player} 
            playersDispatch={playersDispatch}
          />)
        }
      </div>
    </div>
  )
}