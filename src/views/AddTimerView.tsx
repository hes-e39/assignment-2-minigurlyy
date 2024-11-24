import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimerContext } from '../context/TimerContext';

const AddTimerView: React.FC = () => {
    const { addTimer } = useTimerContext();
    const navigate = useNavigate();

    const [type, setType] = useState<'countdown' | 'stopwatch' | 'xy' | 'tabata'>('countdown');
    const [config, setConfig] = useState<any>({});
    const [error, setError] = useState<string | null>(null);

    const handleAddTimer = () => {
        if (
            (type === 'countdown' && !config.totalSeconds) ||
            (type === 'xy' && (!config.timePerRound || !config.totalRounds)) ||
            (type === 'tabata' && (!config.workSeconds || !config.restSeconds || !config.totalRounds)) ||
            (type === 'stopwatch' && !config.totalSeconds)
        ) {
            setError('Please fill in all required fields for the selected timer type.');
            return;
        }

        const newTimer = {
            id: `${type}-${Date.now()}`,
            type,
            config,
            state: 'not running' as const,
        };

        addTimer(newTimer);
        navigate('/');
    };

    const renderConfigFields = () => {
        switch (type) {
            case 'countdown':
                return <input type="number" placeholder="Total Time (seconds)" onChange={e => setConfig({ totalSeconds: +e.target.value })} />;
            case 'xy':
                return (
                    <>
                        <input type="number" placeholder="Time Per Round (seconds)" onChange={e => setConfig({ ...config, timePerRound: +e.target.value })} />
                        <input type="number" placeholder="Total Rounds" onChange={e => setConfig({ ...config, totalRounds: +e.target.value })} />
                    </>
                );
            case 'tabata':
                return (
                    <>
                        <input type="number" placeholder="Work Duration (seconds)" onChange={e => setConfig({ ...config, workSeconds: +e.target.value })} />
                        <input type="number" placeholder="Rest Duration (seconds)" onChange={e => setConfig({ ...config, restSeconds: +e.target.value })} />
                        <input type="number" placeholder="Total Rounds" onChange={e => setConfig({ ...config, totalRounds: +e.target.value })} />
                    </>
                );
            case 'stopwatch':
                return <input type="number" placeholder="Total Time (seconds)" onChange={e => setConfig({ totalSeconds: +e.target.value })} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Add Timer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <select value={type} onChange={e => setType(e.target.value as any)}>
                <option value="countdown">Countdown</option>
                <option value="stopwatch">Stopwatch</option>
                <option value="xy">XY</option>
                <option value="tabata">Tabata</option>
            </select>
            {renderConfigFields()}
            <button onClick={handleAddTimer}>Add Timer</button>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default AddTimerView;
