import classnames from 'classnames';

import React, { useEffect, useRef, useState } from 'react';

import styles from './style.module.css';

interface ITooltip {
    children: React.ReactNode;
    text: string;
}

export const Tooltip: React.FC<ITooltip> = ({ children, text }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const childRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setShowTooltip(childRefs.current.some((ref) => ref && ref.offsetHeight < ref.scrollHeight));
    }, [children]);

    const clonedChild = () => React.Children.map(children, (child, index) => {
        const childReType = child as React.ReactElement<any>;

        const childRef = (el: HTMLDivElement | null) => {
            childRefs.current[index] = el;
        };

        return React.cloneElement(childReType, {
            ref: childRef,
            className: classnames(childReType.props.className, styles.tooltipedText)
        });
    });

    return (
        <>
            {
                clonedChild()
            }
            {
                showTooltip && <div className={ styles.tooltip }>{text}</div>
            }
        </>
    );
};
