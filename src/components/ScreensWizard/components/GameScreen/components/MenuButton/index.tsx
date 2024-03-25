import React from 'react';
import classnames from 'classnames';

import styles from './style.module.css';

interface IMenuButton {
    isOpen: boolean,
    onClick: () => void,
}

export const MenuButton: React.FC<IMenuButton> = ({ isOpen, onClick }) => (
    <button onClick={ onClick } className={ classnames(styles.menuButton, { [styles.menuButtonOpen]: isOpen }) }>
        <span className={ classnames(styles.menuButtonBar, styles.menuButtonBarTop) }></span>
        <span className={ classnames(styles.menuButtonBar, styles.menuButtonBarMiddle) }></span>
        <span className={ classnames(styles.menuButtonBar, styles.menuButtonBarBottom) }></span>
    </button>
);
