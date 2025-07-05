import { configureStore } from '@reduxjs/toolkit';
import factsSlice from './slices/factsSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        facts: factsSlice.reducer,
        chat: chatSlice.reducer,
    },
});

export default store;