import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Pride from 'react-canvas-confetti/dist/presets/pride';
import { TCanvasConfettiAnimationOptions, TConductorInstance } from 'react-canvas-confetti/src/types';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setCurrentStep, setGameSettings } from '@/redux/slices/quizSlice';
import { compareArrays, numberToLetter } from '@/helpers/common';
import { gameStateSelector, questionsSelector } from '@/redux/selectors/quizSelectors';

import { AnswerButton } from './components/AnswerButton';
import { MenuButton } from './components/MenuButton';
import { MoneyBlock } from './components/MoneyBlock';

import styles from './style.module.css';

export const GameScreen: React.FC = () => {
    const confettiRef = useRef<TConductorInstance>();
    const dispatch = useAppDispatch();
    const questions = useAppSelector(questionsSelector);
    const { currentQuestion, earnedMoney } = useAppSelector(gameStateSelector);

    const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const {
        question,
        answers,
        correctAnswers,
        money
    } = questions[currentQuestion];
    const isAnswered = currentAnswers.length === correctAnswers.length;
    const isCorrectAnswers = compareArrays(currentAnswers, correctAnswers);

    const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
        confettiRef.current = conductor;
    };

    const decorateOptions = (defaultOptions: TCanvasConfettiAnimationOptions) => ({
        ...defaultOptions,
        colors: ['#FF8B37', '#EC6259', '#000000']
    });

    const onEndGame = () => dispatch(setCurrentStep(3));

    const onOpenMenu = () =>  setMenuIsOpen((prevState) => !prevState);

    const onToggleFadeIn = () => {
        setTimeout(() => {
            setFadeIn(true);

            setTimeout(() => {
                setFadeIn(false);
            }, 1000);
        }, 1500);
    };

    const onClickAnswer = (answerValue: number) => {
        const isAlreadyAnswered = currentAnswers.includes(answerValue);

        let newAnswers = [...currentAnswers];
        if(isAlreadyAnswered) {
            newAnswers = newAnswers.filter((newAnswer) => newAnswer !== answerValue);
        } else {
            newAnswers.push(answerValue);
        }

        setCurrentAnswers(newAnswers);
    };

    const onAnswered = () => {
        const isEndGame = currentQuestion === questions.length - 1;
        if(!isEndGame && isCorrectAnswers) {
            confettiRef.current?.run({ speed: 50, duration: 500 });
            onToggleFadeIn();
        }

        setTimeout(() => {
            setCurrentAnswers([]);

            let gameSettingModel = {
                currentQuestion: currentQuestion + 1,
                earnedMoney: isCorrectAnswers ? money : earnedMoney
            };

            if(!isCorrectAnswers || isEndGame) {
                gameSettingModel = {
                    ...gameSettingModel,
                    currentQuestion: currentQuestion,
                };
                onEndGame();
            }

            dispatch(setGameSettings(gameSettingModel));
        }, 2000);
    };

    useEffect(() => {
        isAnswered && onAnswered();
    }, [isAnswered]);

    return (
        <div className={ styles.gameScreen } data-testid={ 'questionScreen' }>
            <Pride className={ styles.confetti } onInit={ onInitHandler } decorateOptions={ decorateOptions }/>
            <div className={ classnames(styles.menuButtonWrapper, { [styles.menuButtonWrapperOpen]: menuIsOpen }) }>
                <MenuButton isOpen={ menuIsOpen } onClick={ onOpenMenu } />
            </div>
            <div className={ classnames(styles.questionContent, { [styles.fadeIn]: fadeIn }) }>
                <h2>
                    {question}
                </h2>
                <div className={ styles.questionAnswers }>
                    <div className={ styles.questionAnswersWrapper }>
                        {
                            answers.map((answerData, index) => (
                                <AnswerButton
                                    dataTestId={ `answerButton_${answerData.value}` }
                                    key={ index }
                                    letter={ numberToLetter(index) }
                                    onClick={ () => !isAnswered && onClickAnswer(answerData.value) }
                                    text={ answerData.label }
                                    selected={ currentAnswers.includes(answerData.value) }
                                    correct={ isAnswered && correctAnswers.includes(answerData.value) }
                                    inCorrect={ isAnswered
                                        && currentAnswers.includes(answerData.value)
                                        && !correctAnswers.includes(answerData.value)
                                        && !isCorrectAnswers
                                    }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <MoneyBlock isOpen={ menuIsOpen }/>
        </div>
    );
};
