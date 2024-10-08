import { updateTable } from '@/entities/admin/api/adminApi';
import { ITableForm } from '@/entities/admin/models/types/adminTypes';
import { useGetTable } from '@/shared/api/apies';
import { Button, Form, Input, message, Modal } from 'antd';
import { FC, useEffect } from 'react';

interface UpdateTableModalProps {
    visible: boolean;
    id: number;
    onClose: () => void;
}

export const UpdateTableModal: FC<UpdateTableModalProps> = ({
    onClose,
    visible,
    id,
}) => {
    const [form] = Form.useForm();
    const [updateTables, { isSuccess, isError, isLoading }] = updateTable();
    const { data } = useGetTable(id);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const handleSubmit = (data: ITableForm) => {
        const form = {
            status: true,
            ...data,
            id: id
        };
        updateTables(form);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Успешно изменена!');
            onClose();
            form.resetFields();
        }
        if (isError) {
            message.error('Произошла ошибка при изменении');
        }
    }, [isSuccess, isError, isLoading]);

    return (
        <Modal
            title="Изменить бильярдный стол"
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
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
