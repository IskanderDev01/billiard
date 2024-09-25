// import { useLocation, useNavigate } from 'react-router-dom';
// import { RoutePath } from '../routeConfig/routeConfig';
// import { TOKEN } from '@/shared/const/localstorage';
// import { useEffect } from 'react';

export function RequireAuth({ children }: { children: JSX.Element }) {
    // const [triggerGetMe, { isError, isSuccess, isLoading }] = useGetMeLazy();
    // const token = localStorage.getItem(TOKEN);
    // const location = useLocation();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         triggerGetMe();
    //     } else {
    //         navigate(RoutePath.login, {
    //             state: { from: location },
    //             replace: true,
    //         });
    //     }
    // }, [token, triggerGetMe, navigate, location]);

    // useEffect(() => {
    //     if (isLoading) {
    //         return;
    //     }
    //     if (isSuccess) {
    //         return;
    //     }
    //     if (isError) {
    //         navigate(RoutePath.login, {
    //             state: { from: location },
    //             replace: true,
    //         });
    //     }
    // }, [isError, isSuccess, isLoading, navigate, location]);

    // if (isLoading || !token) {
    //     return null;
    // }

    return children;
}
