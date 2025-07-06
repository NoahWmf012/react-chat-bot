import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const factsSlice = createSlice({
    name: 'facts',
    initialState: [] as string[],
    reducers: {
        setFacts: (state: string[], action: PayloadAction<string[]>) => {
            return action.payload;
        },
        addFact: (state: string[], action: PayloadAction<string>) => {
            state.push(action.payload);
        },
        editFact: (state: string[], action: PayloadAction<{ index: number; text: string }>) => {
            const { index, text } = action.payload;
            if (index >= 0 && index < state.length) {
                state[index] = text;
            }
        },
        deleteFact: (state: string[], action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        }
    },
});

export const { setFacts, addFact, editFact, deleteFact } = factsSlice.actions;

export default factsSlice;