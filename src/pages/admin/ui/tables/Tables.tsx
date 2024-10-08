import { CreateTableModal, UpdateTableModal } from '@/entities'
import { deleteTable } from '@/entities/admin/api/adminApi';
import { useGetTables } from '@/shared/api/apies';
import { ITable } from '@/shared/types/apiesTypes';
import { Button, DeleteButton, EditButton } from '@/shared/ui';
import { message, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

export const Tables = () => {
    const { data } = useGetTables();
    const [deleteTables, { isSuccess, isError }] = deleteTable();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentTableId, setCurrentTableId] = useState<number | null>(null);

    const openCreateModal = () => setIsCreateModalVisible(true);
    const closeCreateModal = () => setIsCreateModalVisible(false);

    const openUpdateModal = (id: number) => {
        setCurrentTableId(id);
        setIsUpdateModalVisible(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalVisible(false);
        setCurrentTableId(null);
    };

    const handleDelete = (id: number) => {
        deleteTables(id);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалена!');
        }
        if (isError) {
            message.error('Произошла ошибка при удалении');
        }
    }, [isSuccess, isError]);

    const columns: TableProps<ITable>['columns'] = [
        {
            title: 'Название стола',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Цена за час',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <>{price} сумм</>,
        },
        {
            title: '',
            dataIndex: 'option',
            key: 'option',
            render: (_, rec) => (
                <div className="flex justify-end">
                    <div className="mr-1">
                        <EditButton onClick={() => openUpdateModal(rec.id)} />
                    </div>
                    <DeleteButton
                        text="delete"
                        onConfirm={() => handleDelete(rec.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    Столы
                </h2>
                <Button onClick={openCreateModal}>Добавить стол</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                className="bg-white"
                scroll={{ y: 500 }}
            />
            <CreateTableModal
                visible={isCreateModalVisible}
                onClose={closeCreateModal}
            />
            {currentTableId !== null && (
                <UpdateTableModal
                    id={currentTableId}
                    visible={isUpdateModalVisible}
                    onClose={closeUpdateModal}
                />
            )}
        </div>
    );
};
