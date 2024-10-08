import { createTable } from '@/entities/admin/api/adminApi';
import { ITableForm } from '@/entities/admin/models/types/adminTypes';
import { Button, Form, Input, message, Modal } from 'antd';
import { FC, useEffect } from 'react';

interface CreateTableModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CreateTableModal: FC<CreateTableModalProps> = ({
    onClose,
    visible,
}) => {
    const [form] = Form.useForm();
    const [createTables, { isSuccess, isError, isLoading }] = createTable();

    const handleSubmit = (data: ITableForm) => {
        const form = {
            status: true,
            ...data,
        };
        createTables(form);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно создана!');
            onClose();
            form.resetFields();
        }
        if (isError) {
            message.error('Произошла ошибка при создании');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <Modal
            title="Создать бильярдный стол"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item<ITableForm>
                    name="name"
                    label="Название стола"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите название стола!',
                        },
                    ]}
                >
                    <Input placeholder="Введите название стола" />
                </Form.Item>
                <Form.Item<ITableForm>
                    name="price"
                    label="Цена за час"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите цену!',
                        },
                    ]}
                >
                    <Input placeholder="Введите цену стола за час" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
