import { CreateUserModal, UpdateUserModal } from '@/entities';
import { deleteUser, useGetUsers } from '@/entities/admin/api/adminApi';
import { IUser } from '@/entities/admin/models/types/adminTypes';
import { DeleteButton, EditButton } from '@/shared/ui';
import { Button, message, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

export const User = () => {
    const { data } = useGetUsers();
    const [deleteUsers, { isSuccess, isError }] = deleteUser();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const openCreateModal = () => setIsCreateModalVisible(true);
    const closeCreateModal = () => setIsCreateModalVisible(false);

    const openUpdateModal = (id: number) => {
        setCurrentUserId(id);
        setIsUpdateModalVisible(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalVisible(false);
        setCurrentUserId(null);
    };

    const handleDelete = (id: number) => {
        deleteUsers(id);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно удалена!');
        }
        if (isError) {
            message.error('Произошла ошибка при удалении');
        }
    }, [isSuccess, isError]);

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                    Пользователи
                </h2>
                <Button onClick={openCreateModal}>Добавить пользователя</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                className="bg-white"
                scroll={{ y: 500 }}
            />
            <CreateUserModal
                visible={isCreateModalVisible}
                onClose={closeCreateModal}
            />
            {currentUserId !== null && (
                <UpdateUserModal
                    id={currentUserId}
                    visible={isUpdateModalVisible}
                    onClose={closeUpdateModal}
                />
            )}
        </div>
    );
};
