import { useReducer, useState, Dispatch, SetStateAction, useEffect } from "react";

type Reducer<State,Action> = (state: State, action: Action) => State; 

export function useLocalStorageReducer<State,Action>(
  key: string,
  reducer: Reducer<State,Action>,
  fallback: State) 
{
  const json = localStorage.getItem(key)
  const initial : State = json ? JSON.parse(json) : fallback

  function localStorageReducer(state: State, action: Action) {
    const newState = reducer(state,action)
    localStorage.setItem(key, JSON.stringify(newState))
    return newState
  }

  return useReducer(localStorageReducer, initial)
}

export function useLocalStorageState<State>(key: string, fallback: State) : [State, Dispatch<SetStateAction<State>>] {
  const json = localStorage.getItem(key)
  const initial : State = json ? JSON.parse(json) : fallback

  const [value, setValue] = useState(initial)

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value])

  return [value, setValue]
}

export function shuffle<T>(input : T[]) {
  const n = input.length
  let output = input.slice()

  for(let i = n - 1; i > 0; i--) {
    // 0 <= j <= i
    let j = Math.floor(Math.random() * (i + 1))
    let tmp = output[i]
    output[i] = output[j]
    output[j] = tmp
  }

  return output
}