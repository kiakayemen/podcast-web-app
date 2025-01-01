import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: 0,
};

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setCurrentTime(state, action) {
            state.currentTime = action.payload;
        },
        resetProgress(state) {
            state.currentTime = 0;
        },
    },
});

export const { setCurrentTime, resetProgress } = progressSlice.actions;

export default progressSlice.reducer;
