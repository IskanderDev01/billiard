import { createUser } from '@/entities/admin/api/adminApi';
import { IUserForm } from '@/entities/admin/models/types/adminTypes';
import { Button, Form, Input, message, Modal } from 'antd';
import { FC, useEffect } from 'react';

interface CreateUserModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CreateUserModal: FC<CreateUserModalProps> = ({
    onClose,
    visible,
}) => {
    const [form] = Form.useForm();
    const [createUsers, { isSuccess, isError, isLoading }] = createUser();

    const handleSubmit = (data: IUserForm) => {
        const form = {
            is_active: true,
            is_superuser: false,
            is_verified: false,
            ...data,
        };
        createUsers(form);
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
            title="Создать пользователя"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item<IUserForm>
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите название email!',
                        },
                    ]}
                >
                    <Input placeholder="Введите email" />
                </Form.Item>
                <Form.Item<IUserForm>
                    name="password"
                    label="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль!',
                        },
                    ]}
                >
                    <Input placeholder="Введите пароль" />
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
