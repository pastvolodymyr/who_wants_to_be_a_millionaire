import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { currentStepSelector } from '@/redux/selectors/quizSelectors';
import { useAppSelector } from '@/hooks/store';

import { StartEndScreen } from './components/StartEndScreen';
import { GameScreen } from './components/GameScreen';

import styles from './style.module.css';

export const ScreensWizard: React.FC = () => {
    const currentStep = useAppSelector(currentStepSelector);

    const [fadeIn, setFadeIn] = useState(false);
    const [innerCurrentStep, setInnerCurrentStep] = useState(1);

    const onToggleFadeIn = () => {
        setFadeIn(true);

        setTimeout(() => {
            setInnerCurrentStep(currentStep);
            setFadeIn(false);
        }, 500);
    };

    const renderFormByStep = (step: number) => {
        switch (step) {
            case 1:
                return <StartEndScreen isStart />;
            case 2:
                return <GameScreen />;
            case 3:
                return <StartEndScreen />;
            default:
                return <StartEndScreen isStart />;
        }
    };

    useEffect(() => {
        currentStep !== innerCurrentStep && onToggleFadeIn();
    }, [currentStep]);

    return (
        <div className={ classnames(styles.screensWizard, { [styles.fadeIn]: fadeIn }) }>
            {
                renderFormByStep(innerCurrentStep)
            }
        </div>
    );
};
