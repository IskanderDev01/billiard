import { useState, memo } from 'react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeConfig } from '@/app/providers/router/routeConfig/routeConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN } from '@/shared/const/localstorage';
import { FlexBox } from '@/shared/ui/box/FlexBox';
import { MenuOutlined } from '@ant-design/icons';
import { useLogout } from '@/entities/auth/api/authApi';
import { Button } from '@/shared/ui';
import { Drawer, Menu, Popconfirm } from 'antd';
import {
    useGetOrders,
    useLazyGetReportCloseSession,
} from '@/entities/client/api/clientApi';

export const Navbar = memo(() => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const [logout] = useLogout();
    const [getReportCloseSession] = useLazyGetReportCloseSession();
    const { data } = useGetOrders();

    const logoutBtn = () => {
        logout();
        localStorage.removeItem(TOKEN);
        navigate('/login');
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const menuItems = [
        ...Object.values(routeConfig)
            .map(({ path, text }) =>
                path && text
                    ? {
                          key: path,
                          label: <NavLink to={path}>{text}</NavLink>,
                      }
                    : null,
            )
            .filter((item) => item !== null),
        {
            key: 'logout',
            label: (
                <Button
                    icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                    type="primary"
                    onClick={logoutBtn}
                >
                    Выйти
                </Button>
            ),
        },
    ];

    return (
        <>
            <FlexBox cls="px-[5%] flex justify-between items-center shadow-md mb-8">
                <FlexBox cls="flex items-center">
                    <nav className="hidden md:flex items-center">
                        {Object.values(routeConfig).map(
                            ({ path, text }) =>
                                path &&
                                text && (
                                    <NavLink
                                        key={path}
                                        className={({ isActive }) =>
                                            `p-6 hover:bg-[rgba(0,0,0,0.2)] ${
                                                isActive
                                                    ? 'border border-solid border-b-2 border-b-slate-950 border-x-0 border-t-0 bg-[rgba(0,0,0,0.1)]'
                                                    : ''
                                            }`
                                        }
                                        to={path}
                                    >
                                        {text}
                                    </NavLink>
                                ),
                        )}
                    </nav>
                </FlexBox>
                <FlexBox cls="hidden md:flex items-center">
                    <Popconfirm
                        onConfirm={() => getReportCloseSession()}
                        title="Вы действительно хотите завершить сессию?"
                    >
                        <Button disabled={Boolean(data?.length)}>
                            Завершить день
                        </Button>
                    </Popconfirm>
                    <Button
                        icon={<FontAwesomeIcon icon={faRightFromBracket} />}
                        type="primary"
                        onClick={logoutBtn}
                    >
                        Выйти
                    </Button>
                </FlexBox>

                <Button
                    icon={<MenuOutlined />}
                    className="md:hidden ml-4"
                    type="text"
                    onClick={openDrawer}
                />
            </FlexBox>

            <Drawer
                placement="right"
                closable={true}
                onClose={closeDrawer}
                open={drawerOpen}
                width="320px"
                style={{ padding: 0 }}
            >
                <Menu mode="vertical" className="text-lg" items={menuItems} />
            </Drawer>
        </>
    );
});
