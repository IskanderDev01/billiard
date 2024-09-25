import { lazy } from 'react';

const LoginFormAsync = lazy(() => import('./LoginForm'));

export { LoginFormAsync as LoginForm };
