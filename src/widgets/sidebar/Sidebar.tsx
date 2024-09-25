import { Link } from 'react-router-dom';
import {
    AppstoreOutlined,
    SettingOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import { RoutePath } from '@/app/providers/router/routeConfig/routeConfig';
import { Layout, Menu } from 'antd';
import { FC, ReactNode, useState } from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const { Sider, Content } = Layout;

interface SidebarProps {
    children: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    const menuItems = [
        {
            key: '3',
            icon: <BarChartOutlined />,
            label: <Link to={RoutePath.admin}>Статистика</Link>,
        },
        {
            key: '1',
            icon: <AppstoreOutlined />,
            label: <Link to={RoutePath.products}>Продукты</Link>,
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            label: <Link to={RoutePath.productoptions}>Опции продуктов</Link>,
        },
        {
            key: '4',
            icon: <FontAwesomeIcon icon={faUsers} />,
            label: <Link to={RoutePath.client}>Клиент</Link>,
        },
    ];

    return (
        <Layout className="min-h-screen">
            <Sider collapsible collapsed={collapsed} onCollapse={handleToggle}>
                <div className="h-full">
                    <div className="text-center py-6">
                        <h1 className="text-2xl font-bold text-white">
                            Бильярд
                        </h1>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        className="bg-transparent text-white"
                        items={menuItems}
                    />
                </div>
            </Sider>
            <Layout>
                <Content className="p-6 bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
