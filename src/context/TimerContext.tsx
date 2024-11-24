import type React from 'react';
import { type ReactNode, createContext, useContext, useState } from 'react';

export interface Timer {
    id: string;
    type: string;
    config: any; // The configuration for each timer
    state: 'not running' | 'running' | 'completed'; // Timer state
}

interface TimerContextProps {
    timers: Timer[];
    addTimer: (timer: Timer) => void;
    removeTimer: (id: string) => void;
    resetWorkout: () => void;
    fastForward: () => void;
    currentTimer: Timer | null;
    startWorkout: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    const addTimer = (timer: Timer) => {
        setTimers(prev => [...prev, timer]);
    };

    const removeTimer = (id: string) => {
        setTimers(prev => prev.filter(timer => timer.id !== id));
    };

    const resetWorkout = () => {
        setTimers(prev => prev.map(timer => ({ ...timer, state: 'not running' })));
        setCurrentIndex(-1);
    };

    const fastForward = () => {
        if (currentIndex >= 0 && currentIndex < timers.length) {
            setTimers(prev => prev.map((timer, index) => (index === currentIndex ? { ...timer, state: 'completed' } : timer)));
            setCurrentIndex(prev => prev + 1);
        }
    };

    const startWorkout = () => {
        if (timers.length > 0) {
            setCurrentIndex(0);
        }
    };

    const currentTimer = currentIndex >= 0 && currentIndex < timers.length ? timers[currentIndex] : null;

    return <TimerContext.Provider value={{ timers, addTimer, removeTimer, resetWorkout, fastForward, currentTimer, startWorkout }}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
};
