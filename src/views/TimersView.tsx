import type React from 'react';
import { useTimerContext } from '../context/TimerContext';

const TimersView: React.FC = () => {
    const { timers, removeTimer, resetWorkout, fastForward, startWorkout, currentTimer } = useTimerContext();

    return (
        <div>
            <h2>Workout Timers</h2>
            <ul>
                {timers.map(timer => (
                    <li key={timer.id}>
                        <div>
                            <strong>Type:</strong> {timer.type}
                        </div>
                        <div>
                            <strong>Config:</strong> {JSON.stringify(timer.config)}
                        </div>
                        <div>
                            <strong>State:</strong> {timer.state}
                        </div>
                        <button onClick={() => removeTimer(timer.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <div>
                <button onClick={startWorkout} disabled={timers.length === 0 || currentTimer?.state === 'running'}>
                    Start Workout
                </button>
                <button onClick={resetWorkout} disabled={timers.length === 0}>
                    Reset Workout
                </button>
                <button onClick={fastForward} disabled={!currentTimer || currentTimer.state === 'completed'}>
                    Fast Forward
                </button>
            </div>

            {currentTimer && (
                <div>
                    <h3>Current Timer</h3>
                    <div>
                        <strong>Type:</strong> {currentTimer.type}
                    </div>
                    <div>
                        <strong>Config:</strong> {JSON.stringify(currentTimer.config)}
                    </div>
                    <div>
                        <strong>State:</strong> {currentTimer.state}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimersView;
