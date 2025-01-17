import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/slices/playerSlice'
import episodeFractionsReducer from '../features/slices/episodeFractionsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      episodeFractions: episodeFractionsReducer
    }
  })
}