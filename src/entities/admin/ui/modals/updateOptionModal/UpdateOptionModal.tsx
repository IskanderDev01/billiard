import { updateOption } from '@/entities/admin/api/adminApi';
import { IOptionForm } from '@/entities/admin/models/types/adminTypes';
import { useGetOption, useGetProducts } from '@/shared/api/apies';
import { Button, Form, Input, message, Modal, Select, SelectProps } from 'antd';
import { FC, useEffect, useState } from 'react';

interface UpdateOptionModalProps {
    id: number;
    visible: boolean;
    onClose: () => void;
}

export const UpdateOptionModal: FC<UpdateOptionModalProps> = ({
    id,
    onClose,
    visible,
}) => {
    const { data } = useGetOption(id);

    const [form] = Form.useForm();
    const [updateOptions, { isSuccess, isError, isLoading }] = updateOption();
    const [productOptions, setProductOptions] =
        useState<SelectProps['options']>();
    const { data: products } = useGetProducts();

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);

    const handleSubmit = (data: IOptionForm) => {
        updateOptions({ option_id: id, ...data });
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Опция успешно изменена!');
            onClose();
            form.resetFields();
        }
        if (isError) {
            message.error('Произошла ошибка при изменении опции');
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
            title="Изменить опцию продукта"
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
                    label="Должность"
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
