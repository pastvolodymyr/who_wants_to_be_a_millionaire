import React from 'react';
import classnames from 'classnames';

import { useAppSelector } from '@/hooks/store';
import { gameStateSelector, moneySelector } from '@/redux/selectors/quizSelectors';
import { numberWithCommas } from '@/helpers/common';
import MoneyBorder from '@/svg/moneyBorder.svg';

import styles from './style.module.css';

interface IMoneyBlock {
    isOpen: boolean,
}

export const MoneyBlock: React.FC<IMoneyBlock> = ({ isOpen }) => {
    const money = useAppSelector(moneySelector);
    const { currentQuestion } = useAppSelector(gameStateSelector);

    const currentMoneyIndex = (money.length - 1) - currentQuestion;

    return (
        <div className={ classnames(styles.moneyBlock, { [styles.moneyBlockOpen]: isOpen }) }>
            <div className={ styles.moneyBlockInner }>
                {
                    money.map((moneyValue, index) => (
                        <div
                            key={ index }
                            className={ classnames(
                                styles.sumBlock,
                                {
                                    [styles.sumBlockActive]: index === currentMoneyIndex,
                                    [styles.sumBlockPast]: index > currentMoneyIndex
                                }
                            ) }
                        >
                            <MoneyBorder />
                            <div className={ styles.sumBlockLine }/>
                            <span>${numberWithCommas(moneyValue)}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
