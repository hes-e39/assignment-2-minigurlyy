import type React from 'react';
import { useTimerContext } from '../context/TimerContext';

const TimersView: React.FC = () => {
    const { timers, removeTimer, resetWorkout, fastForward, startWorkout, currentTimer } = useTimerContext();

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Workout Timers</h2>

            {/* Message when no timers are added */}
            {timers.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>No timers added. Click "Add Timer" to get started.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0, margin: '20px 0' }}>
                    {timers.map((timer, index) => (
                        <li
                            key={timer.id}
                            style={{
                                marginBottom: '15px',
                                padding: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                                #{index + 1} - {timer.type}
                            </div>
                            <div style={{ fontSize: '1rem', marginBottom: '5px' }}>
                                <strong>Config:</strong> {JSON.stringify(timer.config)}
                            </div>
                            <div style={{ fontSize: '1rem', marginBottom: '10px' }}>
                                <strong>State:</strong> {timer.state}
                            </div>
                            <button
                                onClick={() => removeTimer(timer.id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#D9420B',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Workout Controls */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    onClick={startWorkout}
                    disabled={timers.length === 0}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: timers.length > 0 ? '#2C4001' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: timers.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                >
                    Start Workout
                </button>
                <button
                    onClick={resetWorkout}
                    disabled={timers.length === 0}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: timers.length > 0 ? '#730202' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: timers.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                >
                    Reset Workout
                </button>
                <button
                    onClick={fastForward}
                    disabled={!currentTimer || currentTimer.state === 'completed'}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: currentTimer && currentTimer.state !== 'completed' ? '#D98F4E' : '#ccc',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: currentTimer && currentTimer.state !== 'completed' ? 'pointer' : 'not-allowed',
                    }}
                >
                    Fast Forward
                </button>
            </div>

            {/* Current Timer Display */}
            {currentTimer && (
                <div
                    style={{
                        marginTop: '30px',
                        padding: '15px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        backgroundColor: '#f2f2f2',
                    }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Current Timer</h3>
                    <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                        <strong>Type:</strong> {currentTimer.type}
                    </p>
                    <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                        <strong>Config:</strong> {JSON.stringify(currentTimer.config)}
                    </p>
                    <p style={{ fontSize: '1.2rem' }}>
                        <strong>State:</strong> {currentTimer.state}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimersView;
