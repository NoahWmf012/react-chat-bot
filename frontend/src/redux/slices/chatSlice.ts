import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
    facts: [],
    chatHistory: [],
};

interface ChatState {
    facts: string[];
    chatHistory: string[];
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState as ChatState,
    reducers: {
        addMessage: (state: ChatState, action: PayloadAction<string>) => {
            state.chatHistory.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice;
