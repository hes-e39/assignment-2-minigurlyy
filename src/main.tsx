import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import { TimerProvider } from './context/TimerContext';
import AddTimerView from './views/AddTimerView';
import DocumentationView from './views/DocumentationView';
import TimersView from './views/TimersView';

const PageIndex = () => {
    return (
        <div>
            <h1 className="main-heading">Workout App</h1>
            <ul className="link-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add">Add Timer</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

const router = createHashRouter([
    {
        path: '/',
        element: <PageIndex />,
        children: [
            { index: true, element: <TimersView /> },
            { path: '/add', element: <AddTimerView /> },
            { path: '/docs', element: <DocumentationView /> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TimerProvider>
            <RouterProvider router={router} />
        </TimerProvider>
    </StrictMode>,
);
