import { updateUser, useGetUser } from '@/entities/admin/api/adminApi';
import { IUserForm } from '@/entities/admin/models/types/adminTypes';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { FC, useEffect } from 'react';

interface UpdateUserModalProps {
    id: number;
    visible: boolean;
    onClose: () => void;
}

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
    id,
    onClose,
    visible,
}) => {
    const [form] = Form.useForm();
    const [updateUsers, { isSuccess, isError, isLoading }] = updateUser();
    const { data } = useGetUser(id);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const handleSubmit = (formData: IUserForm) => {
        const form = {
            is_active: true,
            is_superuser: formData.is_superuser || false,  // Используем значение из формы
            is_verified: false,
            id: id,
            ...formData,
        };
        updateUsers(form);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно изменено!');
            onClose();
            form.resetFields();
        }
        if (isError) {
            message.error('Произошла ошибка при изменении');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <Modal
            title="Изменить данные пользователя"
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
                            message: 'Пожалуйста, введите email!',
                        },
                    ]}
                >
                    <Input placeholder="Введите email" />
                </Form.Item>
                <Form.Item<IUserForm>
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>
                <Form.Item<IUserForm>
                    name="is_superuser"
                    valuePropName="checked"
                >
                    <Checkbox>Сделать супер администратором</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
