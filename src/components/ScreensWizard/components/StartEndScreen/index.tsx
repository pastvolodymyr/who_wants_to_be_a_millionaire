import React, { useEffect } from 'react';
import classNames from 'classnames';

import { setCurrentStep, setGameSettings } from '@/redux/slices/quizSlice';
import { gameStateSelector, questionsSelector } from '@/redux/selectors/quizSelectors';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { numberWithCommas } from '@/helpers/common';
import LikeHand from '@/svg/LikeHand.svg';

import styles from './style.module.css';

interface IStartEndScreen {
    isStart?: boolean
}

export const StartEndScreen: React.FC<IStartEndScreen> = ({ isStart }) => {
    const dispatch = useAppDispatch();
    const { earnedMoney } = useAppSelector(gameStateSelector);
    const questions = useAppSelector(questionsSelector);

    const titleText = isStart
        ? <>Who wants to be <br />a millionaire?</>
        : `$${numberWithCommas(earnedMoney)} earned`;

    const buttonText = isStart
        ? 'Start'
        : 'Try again';

    const onClickStart = () => dispatch(setCurrentStep(isStart ? 2 : 1));

    useEffect(() => {
        isStart
        && dispatch(setGameSettings({
            currentQuestion: 0,
            earnedMoney: 0
        }));
    }, [isStart]);

    return (
        <div className={ classNames(styles.startEndScreen, { [styles.startScreen]: isStart }) }>
            <div className={ styles.content }>
                <div className={ styles.leftContent }>
                    <LikeHand />
                </div>
                <div className={ styles.rightContent }>
                    {
                        !isStart && <p className={ styles.totalScore }>Total score:</p>
                    }
                    <h1 className={ styles.title }>{titleText}</h1>
                    <PrimaryButton
                        disabled={ !questions.length }
                        dataTestId="startGame"
                        text={ buttonText }
                        onClick={ onClickStart }
                    />
                    {
                        !questions.length
                        && <span className={ styles.noQuestionsText }>
                            Sorry, there is no questions for you, come back later!
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};
