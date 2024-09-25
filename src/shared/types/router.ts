import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    text?: string;
    authOnly?: boolean;
}
