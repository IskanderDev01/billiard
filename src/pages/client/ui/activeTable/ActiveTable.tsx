import React, { useState } from 'react';
import { useGetOrders, updateOrder } from '@/entities/client/api/clientApi';
import { IOrder } from '@/entities/client/models/types/clientTypes';
import { Button, DeleteButton, Table } from '@/shared/ui';
import { TableProps } from 'antd';
import { HistoryModal, ProductModal } from '@/entities';

export const ActiveTable: React.FC = () => {
    const { data } = useGetOrders();
    const [updateTableOrder] = updateOrder();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isHistoryModal, setIsHistoryModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [selectedHistory, setSelectedHistory] = useState<number | null>(null);

    const columns: TableProps<IOrder>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'table_name',
            key: 'name',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: () => 'Играют',
        },
        {
            title: <div className="w-96 text-end">Действия</div>,
            key: 'actions',
            render: (_, record) => (
                <div className="w-96 flex justify-end items-center">
                    <Button
                        type="primary"
                        onClick={() => handleHistory(record.id)}
                    >
                        История
                    </Button>
                    <Button
                        type="primary"
                        className="mx-5"
                        onClick={() => handleAddProduct(record.id)}
                    >
                        Добавить продукт
                    </Button>
                    <DeleteButton
                        text="close"
                        onConfirm={() => handleCloseTable(record.id)}
                    />
                </div>
            ),
        },
    ];

    const handleHistory = (id: number) => {
        setSelectedHistory(id);
        setIsHistoryModal(true);
    };

    const handleAddProduct = (id: number) => {
        setSelectedOrderId(id);
        setIsModalVisible(true);
    };

    const handleCloseTable = (id: number) => {
        updateTableOrder({
            options: [],
            products: [],
            status: false,
            order_id: id,
        });
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(rec) => rec.id}
                pagination={false}
            />
            {selectedOrderId && (
                <ProductModal
                    orderId={selectedOrderId}
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
            {selectedHistory && (
                <HistoryModal
                    orderId={selectedHistory}
                    visible={isHistoryModal}
                    onClose={() => setIsHistoryModal(false)}
                />
            )}
        </>
    );
};