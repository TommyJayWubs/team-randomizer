import { FormEvent, useRef } from "react";
import { initial, playersReducer } from "./playersReducer";
import { TeamDisplay } from "./TeamDisplay";
import { useLocalStorageReducer } from "./utils"

function App() {
  const [playersState, playersDispatch] = useLocalStorageReducer('players', playersReducer, initial)

  const ref = useRef<HTMLInputElement>(null!)

  function addPlayer(e: FormEvent) {
    e.preventDefault()
    if(ref.current.value) {
      playersDispatch({type: 'add', name: ref.current.value})
      ref.current.value = ''
    }
  }

  const teamOne = playersState.players.filter((_,i) => i % 2 == 0)
  const teamTwo = playersState.players.filter((_,i) => i % 2 == 1)

  return (
    <div>
      <h1> Team Randomizer </h1>
      <form onSubmit={addPlayer} className="justify-center">
        <input ref={ref} style={{marginRight: '0.2rem'}}/>
        <button className="teal">Add Player</button>
      </form>
      <div className="justify-center">
        <button className='teal' onClick={() => playersDispatch({type: 'shuffle'})}> 
          Shuffle
        </button>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{flex: '50%'}}>
          <TeamDisplay teamNumber={1} teamPlayers={teamOne} playersDispatch={playersDispatch}/>
        </div>
        <div style={{flex: '50%'}}>
          <TeamDisplay teamNumber={2} teamPlayers={teamTwo} playersDispatch={playersDispatch}/>
        </div>
      </div>
    </div>
  )
}

export default App
