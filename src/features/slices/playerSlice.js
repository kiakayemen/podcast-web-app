import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEpisodeId: null,
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
    setCurrentEpisodeId(state, action) {
      state.currentEpisodeId = action.payload;
    }
  },
});

export const { togglePlay, setPlaybackRate, setTimePlayed, setPercentagePlayed, setCurrentEpisodeId } = playerSlice.actions;
export default playerSlice.reducer;