import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimerContext } from '../context/TimerContext';

const AddTimerView: React.FC = () => {
    const { addTimer } = useTimerContext();
    const navigate = useNavigate();

    const [type, setType] = useState<string>('countdown');
    const [config, setConfig] = useState<any>({});

    const handleAddTimer = () => {
        const newTimer = {
            id: `${type}-${Date.now()}`,
            type,
            config,
            state: 'not running' as const,
        };
        addTimer(newTimer);
        navigate('/');
    };

    return (
        <div>
            <h2>Add Timer</h2>
            <select value={type} onChange={e => setType(e.target.value)}>
                <option value="countdown">Countdown</option>
                <option value="stopwatch">Stopwatch</option>
                <option value="xy">XY</option>
                <option value="tabata">Tabata</option>
            </select>

            {/* Additional inputs for configuration based on the timer type */}
            <div>
                {type === 'countdown' && <input type="number" placeholder="Initial Time (seconds)" onChange={e => setConfig({ initialTime: +e.target.value })} />}
                {type === 'xy' && (
                    <>
                        <input type="number" placeholder="Time Per Round (seconds)" onChange={e => setConfig((prev: any) => ({ ...prev, timePerRound: +e.target.value }))} />
                        <input type="number" placeholder="Total Rounds" onChange={e => setConfig((prev: any) => ({ ...prev, totalRounds: +e.target.value }))} />
                    </>
                )}
                {type === 'tabata' && (
                    <>
                        <input type="number" placeholder="Work Duration (seconds)" onChange={e => setConfig((prev: any) => ({ ...prev, workDuration: +e.target.value }))} />
                        <input type="number" placeholder="Rest Duration (seconds)" onChange={e => setConfig((prev: any) => ({ ...prev, restDuration: +e.target.value }))} />
                        <input type="number" placeholder="Total Rounds" onChange={e => setConfig((prev: any) => ({ ...prev, totalRounds: +e.target.value }))} />
                    </>
                )}
            </div>

            <button onClick={handleAddTimer}>Add Timer</button>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default AddTimerView;
