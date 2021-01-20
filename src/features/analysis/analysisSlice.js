import {createSlice} from "@reduxjs/toolkit";

export const analysisSlice = createSlice({
    name: 'analysis',
    initialState: {
        codes: []
    },
    reducers: {
        newAnalysis: (state, action) => {
            state.codes = action.payload
        },
    },
});

export const { newAnalysis } = analysisSlice.actions;

export default analysisSlice.reducer;
