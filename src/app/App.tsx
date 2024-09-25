import { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from './providers/router';

function App() {
    return (
        <div className="min-h-screen bg-cover">
            <Suspense fallback="">
                <>
                    <AppRouter />
                </>
            </Suspense>
        </div>
    );
}

export default App;
