import { createSelector } from 'reselect';

import { RootState } from '@/redux/store';

const selectSelf = (state: RootState): RootState['quiz'] => state.quiz;

export const currentStepSelector = createSelector([selectSelf], ({ currentStep }) => currentStep);

export const questionsSelector = createSelector([selectSelf], ({ gameQuestions }) => gameQuestions);

export const moneySelector = createSelector([questionsSelector], (gameQuestions) => {
    return gameQuestions.map((question) => question.money).reverse();
});

export const gameStateSelector = createSelector([selectSelf], ({ gameState }) => gameState);
