import { lazy } from 'react';

const CardAsync = lazy(() => import('./Card'));

export { CardAsync as Card };
