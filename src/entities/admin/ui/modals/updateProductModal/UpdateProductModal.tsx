import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { IProductForm } from '@/entities/admin/models/types/adminTypes';
import { FC, useEffect, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import { useGetProduct } from '@/shared/api/apies';
import { baseURL } from '@/shared/api/rtkApi'

export interface UpdateProductModalProps {
    id: number;
    visible: boolean;
    onClose: () => void;
    onProductUpdated: () => void;
}

export const UpdateProductModal: FC<UpdateProductModalProps> = ({
    id,
    visible,
    onClose,
    onProductUpdated,
}) => {
    const { data } = useGetProduct(id);
    const [file, setFile] = useState<UploadFile | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const handleSubmit = async (values: IProductForm) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price.toString());
        formData.append('description', values.description);
        formData.append('status', 'true');
        formData.append('sort_order', values.sort_order.toString());
        formData.append('product_id', id.toString());
        if (file) {
            formData.append('image', file as any);
        }

        try {
            const response = await fetch(
                `${baseURL}product/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                        Accept: 'application/json',
                    },
                    body: formData,
                },
            );

            if (!response.ok) {
                throw new Error('Ошибка при обновлении продукта');
            }

            message.success('Продукт успешно обновлен!');
            form.resetFields();
            onProductUpdated();
            onClose();
        } catch (error: any) {
            message.error(
                'Произошла ошибка при обновлении продукта: ' + error?.message ||
                    'Неизвестная ошибка',
            );
        }
    };

    const handleFileChange = ({ file }: { file: UploadFile }) => {
        setFile(file);
    };

    return (
        <Modal
            title="Обновить продукт"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    name="name"
                    label="Имя продукта"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите имя продукта!',
                        },
                    ]}
                >
                    <Input placeholder="Введите имя продукта" />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Цена"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите цену!',
                        },
                    ]}
                >
                    <Input placeholder="Введите цену" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите описание!',
                        },
                    ]}
                >
                    <Input placeholder="Введите описание" />
                </Form.Item>
                <Form.Item
                    name="sort_order"
                    label="Порядок сортировки"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите порядок сортировки!',
                        },
                    ]}
                >
                    <Input placeholder="Введите порядок сортировки" />
                </Form.Item>
                <Form.Item name="image" label="Изображение">
                    <Upload
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        accept="image/*"
                    >
                        <Button>Загрузить изображение</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Обновить продукт
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

