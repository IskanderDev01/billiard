import { Button, Form, Input, message, Modal, Upload } from 'antd';
import { IProductForm } from '@/entities/admin/models/types/adminTypes';
import { FC, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';

export interface CreateProductModalProps {
    visible: boolean;
    onClose: () => void;
    onProductCreated: () => void;
}

export const CreateProductModal: FC<CreateProductModalProps> = ({
    visible,
    onClose,
    onProductCreated,
}) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState<UploadFile | null>(null);

    const handleSubmit = (values: IProductForm) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price.toString());
        formData.append('description', values.description);
        formData.append('status', 'true');
        formData.append('sort_order', values.sort_order.toString());
        formData.append('image', file as any);

        try {
            fetch('http://176.221.29.165:2222/product/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                },
                body: formData,
            })
                .then((res) => res.json())
                .then(() => {
                    form.resetFields();
                    message.success('Продукт успешно создан!');
                    onProductCreated();
                })
                .catch(() =>
                    message.error('Произошла ошибка при создании продукта'),
                );
            onClose();
        } catch (error) {
            message.error('Произошла ошибка при создании продукта: ' + error);
        }
    };

    const handleFileChange = ({ file }: { file: UploadFile }) => {
        setFile(file);
    };

    return (
        <Modal
            title="Создать продукт"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    name="name"
                    label="Название продукта"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите название продукта!',
                        },
                    ]}
                >
                    <Input placeholder="Введите название продукта" />
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
                <Form.Item
                    name="image"
                    label="Изображение"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, загрузите изображение!',
                        },
                    ]}
                >
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
                        Создать продукт
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

