import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Fact {
    text: string;
}

export type FactsState = Fact[];

export const factsSlice = createSlice({
    name: 'facts',
    initialState: [] as FactsState,
    reducers: {
        addFact: (state: FactsState, action: PayloadAction<string>) => {
            state.push({ text: action.payload });
        },
        editFact: (state: FactsState, action: PayloadAction<{ index: number; text: string }>) => {
            const { index, text } = action.payload;
            if (index >= 0 && index < state.length) {
                state[index].text = text;
            }
        },
        deleteFact: (state: FactsState, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        }
    },
});

export const { addFact } = factsSlice.actions;

export default factsSlice;