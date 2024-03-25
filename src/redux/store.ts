import { configureStore } from '@reduxjs/toolkit';

import onboardingStudentsSlice from './slices/quizSlice';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        quiz: onboardingStudentsSlice,
    },
});
