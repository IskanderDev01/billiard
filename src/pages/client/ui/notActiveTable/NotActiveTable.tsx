import { TableProps } from 'antd';
import { ITable } from '@/shared/types/apiesTypes';
import React from 'react';
import { Button, Table } from '@/shared/ui';
import { useGetTables } from '@/shared/api/apies';
import { createOrder } from '@/entities/client/api/clientApi';

export const NotActiveTable: React.FC = () => {
    const { data } = useGetTables();
    const [openOrder, {isLoading}] = createOrder();

    const columns: TableProps<ITable>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Цена за час',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price} сумм</span>,
        },
        {
            title: <div className="w-96 text-end">Действия</div>,
            key: 'actions',
            render: (_, record) => (
                <div className="w-96 flex justify-end items-center">
                    <Button
                        type="primary"
                        disabled={isLoading}
                        onClick={() => handleOpenTable(record.id)}
                    >
                        Открыть
                    </Button>
                </div>
            ),
        },
    ];

    const handleOpenTable = (id: number) => {
        openOrder({ table_id: id, status: true });
    };

    return (
        <Table
            columns={columns}
            loading={Boolean(!data)}
            dataSource={data}
            rowKey={(rec) => rec.id}
            pagination={false}
        />
    );
};
