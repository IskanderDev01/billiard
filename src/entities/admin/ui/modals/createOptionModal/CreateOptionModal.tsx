import { createOption } from '@/entities/admin/api/adminApi';
import { IOptionForm } from '@/entities/admin/models/types/adminTypes';
import { useGetProducts } from '@/shared/api/apies';
import { Button, Form, Input, message, Modal, Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';

interface CreateOptionModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CreateOptionModal: FC<CreateOptionModalProps> = ({
    onClose,
    visible,
}) => {
    const [form] = Form.useForm();
    const [createOptions, { isSuccess, isError, isLoading }] = createOption();
    const [productOptions, setProductOptions] =
        useState<SelectProps['options']>();
    const { data: products } = useGetProducts();

    const handleSubmit = (data: IOptionForm) => {
        createOptions(data);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Опция успешно создана!');
            onClose();
            form.resetFields();
        }
        if (isError) {
            message.error('Произошла ошибка при создании');
        }
    }, [isSuccess, isError, isLoading]);

    useEffect(() => {
        if (products) {
            setProductOptions(
                products.map((product) => ({
                    label: product.name,
                    value: product.id,
                })),
            );
        }
    }, [products]);

    return (
        <Modal
            title="Создать опцию для продукта"
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item<IOptionForm>
                    name="name"
                    label="Название опции"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите название продукта!',
                        },
                    ]}
                >
                    <Input placeholder="Введите название продукта" />
                </Form.Item>
                <Form.Item<IOptionForm>
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
                <Form.Item<IOptionForm>
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
                <Form.Item<IOptionForm>
                    name="product_id"
                    label="Продукт"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, заполните поле!',
                        },
                    ]}
                >
                    <Select
                        disabled={!productOptions?.length}
                        options={productOptions}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать опцию
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

