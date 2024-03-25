import React from 'react';
import classnames from 'classnames';

import { Tooltip } from '@/components/Tooltip';
import ButtonBorder from '@/svg/buttonBorder.svg';

import styles from './style.module.css';

interface IAnswerButton {
    correct: boolean,
    inCorrect: boolean,
    onClick: () => void,
    text: string
    letter: string
    selected?: boolean,
    dataTestId?: string
}

export const AnswerButton: React.FC<IAnswerButton> = ({
     correct,
     inCorrect,
     selected,
     onClick,
     text,
     letter,
     dataTestId
}) => {
    return (
        <button
            onClick={ onClick }
            data-testid={ dataTestId }
            className={ classnames(styles.answerButton, {
                [styles.inCorrect]: inCorrect,
                [styles.correct]: correct,
                [styles.selected]: selected
            }) }
        >
            <ButtonBorder />
            <Tooltip text={ text }>
                <span className={ styles.buttonLabel }>
                    <span className={ styles.labelLetter }>{letter}</span>
                    {text}
                </span>
            </Tooltip>
        </button>
    );
};
