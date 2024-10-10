import { CreateOptionModal, UpdateOptionModal } from '@/entities';
import { deleteOption } from '@/entities/admin/api/adminApi';
import { useGetOptions } from '@/shared/api/apies';
import { IOption } from '@/shared/types/apiesTypes';
import { DeleteButton, EditButton} from '@/shared/ui';
import { Button, message, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

export const ProductOptions = () => {
    const { data } = useGetOptions();
    const [deleteProductsOption, { isSuccess, isError }] = deleteOption();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentOptionId, setCurrentOptionId] = useState<number | null>(null);

    const openCreateModal = () => setIsCreateModalVisible(true);
    const closeCreateModal = () => setIsCreateModalVisible(false);

    const openUpdateModal = (id: number) => {
        setCurrentOptionId(id);
        setIsUpdateModalVisible(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalVisible(false);
        setCurrentOptionId(null);
    };

    const handleDelete = (id: number) => {
        deleteProductsOption(id);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Опция успешно удалена!');
        }
        if (isError) {
            message.error('Произошла ошибка при удалении');
        }
    }, [isSuccess, isError]);

    const columns: TableProps<IOption>['columns'] = [
        {
            title: 'Название опции',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Цена',
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
                    Опции продуктов
                </h2>
                <Button onClick={openCreateModal}>Добавить опцию</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                className="bg-white"
                scroll={{ y: 500 }}
            />
            <CreateOptionModal
                visible={isCreateModalVisible}
                onClose={closeCreateModal}
            />
            {currentOptionId !== null && (
                <UpdateOptionModal
                    id={currentOptionId}
                    visible={isUpdateModalVisible}
                    onClose={closeUpdateModal}
                />
            )}
        </div>
    );
};
