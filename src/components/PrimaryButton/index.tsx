import React from 'react';

import classnames from 'classnames';

import styles from './style.module.css';

interface IPrimaryButton {
    text: string,
    dataTestId?: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    disabled: boolean,
}

export const PrimaryButton: React.FC<IPrimaryButton> = ({ text, onClick, dataTestId, disabled }) => (
    <button
        onClick={ onClick }
        className={ classnames(styles.primaryButton, { [styles.disabled]: disabled }) }
        data-testid={ dataTestId }
    >
        {text}
    </button>
);
