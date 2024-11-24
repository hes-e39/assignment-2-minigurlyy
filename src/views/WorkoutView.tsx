import type React from 'react';
import ActionButton from '../components/generic/ActionButton'; // Ensure ActionButton is defined and exported correctly
import RoundDisplay from '../components/generic/RoundDisplay';
import { useTimerContext } from '../context/TimerContext';

const WorkoutView: React.FC = () => {
    const { currentTimer, startWorkout, resetWorkout, fastForward, timers } = useTimerContext();

    const renderTimerDetails = () => {
        if (!currentTimer) return <p>No active timer.</p>;

        return (
            <div>
                <p>Type: {currentTimer.type}</p>
                <p>State: {currentTimer.state}</p>
                <p>Config: {JSON.stringify(currentTimer.config)}</p>
            </div>
        );
    };

    return (
        <div>
            <h2>Workout</h2>
            {renderTimerDetails()}
            {currentTimer?.type === 'xy' && <RoundDisplay currentRound={currentTimer.config.currentRound || 1} totalRounds={currentTimer.config.totalRounds || 1} />}
            {currentTimer && <RoundDisplay timeInMs={currentTimer.config.initialTime ? currentTimer.config.initialTime * 1000 : 0} />}
            <div>
                <ActionButton label="Start Workout" onClick={startWorkout} />
                <ActionButton label="Reset Workout" onClick={resetWorkout} />
                <ActionButton label="Fast Forward" onClick={fastForward} />
            </div>
        </div>
    );
};

export default WorkoutView;
