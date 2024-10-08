import { message, TableProps, Image, Table, Button } from 'antd';
import { useGetProducts } from '@/shared/api/apies';
import { IProduct } from '@/shared/types/apiesTypes';
import { DeleteButton, EditButton } from '@/shared/ui';
import { useState } from 'react';
import { CreateProductModal, UpdateProductModal } from '@/entities';
import { deleteProduct } from '@/entities/admin/api/adminApi';

export const Products = () => {
    const { data, refetch } = useGetProducts();
    const [, setIsPreviewOpened] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [currentProductId, setCurrentProductId] = useState<number | null>(
        null,
    );
    const [deleteProducts] = deleteProduct();
    const openCreateModal = () => setIsCreateModalVisible(true);
    const closeCreateModal = () => setIsCreateModalVisible(false);

    const openUpdateModal = (id: number) => {
        setCurrentProductId(id);
        setIsUpdateModalVisible(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalVisible(false);
        setCurrentProductId(null);
    };

    const handleProductCreated = () => {
        refetch();
        closeCreateModal();
    };

    const handleProductUpdated = () => {
        refetch();
        closeUpdateModal();
    };

    const handleDelete = (id: number) => {
        deleteProducts(id)
            .then(() => {
                message.success('Продукт успешно удалён!');
                refetch();
            })
            .catch(() => {
                message.error('Произошла ошибка при удалении продукта');
            });
    };

    const columns: TableProps<IProduct>['columns'] = [
        {
            title: 'Фото',
            dataIndex: 'image',
            key: 'image',
            render: (url) => (
                <div>
                    <Image
                        src={`http://176.221.29.165:2222${url}`}
                        preview={{ onVisibleChange: setIsPreviewOpened }}
                        width={50}
                        height={50}
                    />
                </div>
            ),
        },
        {
            title: 'Название продукта',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="font-bold">{text}</span>,
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <span>{price} сумм</span>,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <span>{description === 'undefined' ? '' : description}</span>
            ),
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
                <h2 className="text-2xl font-bold text-slate-800">Продукты</h2>
                <Button onClick={openCreateModal}>Добавить продукт</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                className="bg-white"
                scroll={{ y: 500 }}
            />
            <CreateProductModal
                visible={isCreateModalVisible}
                onClose={closeCreateModal}
                onProductCreated={handleProductCreated}
            />
            {currentProductId !== null && (
                <UpdateProductModal
                    id={currentProductId}
                    visible={isUpdateModalVisible}
                    onClose={closeUpdateModal}
                    onProductUpdated={handleProductUpdated}
                />
            )}
        </div>
    );
};
