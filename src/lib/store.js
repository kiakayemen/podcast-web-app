import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/slices/playerSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
    }
  })
}