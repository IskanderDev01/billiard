import { Table } from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';

export const Admin = () => {
    const [dailyStats] = useState([
        { day: 'Понедельник', income: 400, products: 50, tables: 10 },
        { day: 'Вторник', income: 300, products: 45, tables: 8 },
        { day: 'Среда', income: 500, products: 60, tables: 12 },
        { day: 'Четверг', income: 450, products: 55, tables: 11 },
        { day: 'Пятница', income: 600, products: 70, tables: 14 },
        { day: 'Суббота', income: 700, products: 80, tables: 15 },
        { day: 'Воскресенье', income: 550, products: 65, tables: 13 },
    ]);

    const [monthlyStats] = useState([
        { month: 'Январь', income: 10000, products: 800, tables: 300 },
        { month: 'Февраль', income: 9500, products: 750, tables: 290 },
        { month: 'Март', income: 12000, products: 900, tables: 320 },
        { month: 'Апрель', income: 11000, products: 850, tables: 310 },
        { month: 'Май', income: 13000, products: 950, tables: 330 },
    ]);

    const columns = [
        { title: 'День', dataIndex: 'day', key: 'day' },
        { title: 'Доход (руб.)', dataIndex: 'income', key: 'income' },
        { title: 'Продано продуктов', dataIndex: 'products', key: 'products' },
        { title: 'Использовано столов', dataIndex: 'tables', key: 'tables' },
    ];

    const monthColumns = [
        { title: 'Месяц', dataIndex: 'month', key: 'month' },
        { title: 'Доход (руб.)', dataIndex: 'income', key: 'income' },
        { title: 'Продано продуктов', dataIndex: 'products', key: 'products' },
        { title: 'Использовано столов', dataIndex: 'tables', key: 'tables' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Статистика
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="products" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="tables" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>

            <Table
                columns={columns}
                dataSource={dailyStats}
                pagination={false}
                className="my-8"
            />

            <h2 className="text-2xl font-bold mb-4">Месячная статистика</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#8884d8" />
                    <Line type="monotone" dataKey="products" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="tables" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>

            <Table
                columns={monthColumns}
                dataSource={monthlyStats}
                pagination={false}
                className="my-8"
            />
        </div>
    );
};
