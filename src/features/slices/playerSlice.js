import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  playbackRate: 1,
  timePlayed: 0,
  percentagePlayed: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPlaybackRate(state, action) {
      state.playbackRate = action.payload;
    },
    setTimePlayed(state, action) {
      state.timePlayed = action.payload;
    },
    setPercentagePlayed(state, action) {
      state.percentagePlayed = action.payload;
    },
  },
});

export const { togglePlay, setPlaybackRate, setTimePlayed, setPercentagePlayed } = playerSlice.actions;
export default playerSlice.reducer;