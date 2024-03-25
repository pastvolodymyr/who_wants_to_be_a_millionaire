import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { validateAndFilterQuestions } from '@/helpers/questionsValidation';

import questionsData from './quizConfig.json';

export interface IQuestion {
  question: string,
  correctAnswers: number[],
  money: number,
  answers: {
    label: string,
    value: number
  }[]
}

interface IGameState {
  currentQuestion: number,
  earnedMoney: number
}

interface IInitialState {
  currentStep: number,
  gameState: IGameState
  gameQuestions: IQuestion[]
}

const initialState: IInitialState = {
  currentStep: 1,
  gameQuestions: validateAndFilterQuestions(questionsData),
  gameState: {
    currentQuestion: 0,
    earnedMoney: 0
  }
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setGameQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.gameQuestions = validateAndFilterQuestions(action.payload);
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setGameSettings: (state, action: PayloadAction<IGameState>) => {
      state.gameState = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  setGameSettings,
  setGameQuestions
} = quizSlice.actions;

export default quizSlice.reducer;
