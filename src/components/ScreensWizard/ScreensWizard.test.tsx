import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '@/redux/renderWithProviders';
import quizConfig from '@/redux/slices/quizConfig.json';

import { store } from '@/redux/store';
import { setGameQuestions } from '@/redux/slices/quizSlice';

import { ScreensWizard } from './';

const questionMockUp = [
    {
        'question': 'What value is given for the left margin: margin: 5px 10px 3px 8px;?',
        'correctAnswers': [2],
        'money': 500,
        'answers': [
            {
                'label': '5px',
                'value': 1
            },
            {
                'label': '8px',
                'value': 2
            },
            {
                'label': '3px',
                'value': 3
            },
            {
                'label': '10px',
                'value': 4
            }
        ]
    }
];

describe('ScreensWizard', () => {
    it('Check main page', () => {
        renderWithProviders(<ScreensWizard />);

        act(() => {
            store.dispatch(setGameQuestions(questionMockUp));
        });

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
    });
    it('Start game by start button', async () => {
        renderWithProviders(<ScreensWizard />);

        act(() => {
            fireEvent.click(screen.getByTestId('startGame'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('questionScreen')).toBeInTheDocument();
        });
    });
    it('Try to complete game', async () => {
        renderWithProviders(<ScreensWizard />);

        act(() => {
            fireEvent.click(screen.getByTestId('startGame'));
        });

        await waitFor(() => {
            expect(screen.getByTestId('questionScreen')).toBeInTheDocument();
        });

        const question = quizConfig[0];

        act(() => {
            if(question.correctAnswers.length > 1) {
                question.correctAnswers.forEach((answer) => {
                    fireEvent.click(screen.getByTestId(`answerButton_${answer}`));
                });
            } else {
                fireEvent.click(screen.getByTestId(`answerButton_${question.correctAnswers[0]}`));
            }
        });

        await waitFor(() => {
            const heading = screen.getByRole('heading', { level: 1 });
            expect(heading).toBeInTheDocument();
        }, { timeout: 3000 });
    });
});
