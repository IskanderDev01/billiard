import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { StoreProvider } from './app/providers/StoreProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    );
}

const root = createRoot(container);

root.render(
    <StoreProvider>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </StoreProvider>,
);
