import { FC } from 'react';
import { Card, Divider, Row, Col, Typography } from 'antd';
import { useGetOptions, useGetProducts } from '@/shared/api/apies';
import styled from 'styled-components';

const { Title, Text } = Typography;

interface HistoryProductsModalProps {
    products: Array<{
        product_id?: string;
        option_id?: string;
        quantity: string;
    }>;
}

const ScrollContainer = styled.div`
    max-height: 400px; /* Задайте высоту по вашему усмотрению */
    overflow-y: auto;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const HistoryProductsModal: FC<HistoryProductsModalProps> = ({
    products,
}) => {
    const { data: productData } = useGetProducts();
    const { data: optionData } = useGetOptions();

    const filteredProducts = products.filter(
        (item) => 'product_id' in item && !!item.product_id,
    );

    const filteredOptions = products.filter(
        (item) => 'option_id' in item && !!item.option_id,
    );

    return (
        <div style={{ padding: '16px' }}>
            <Title level={3} style={{ marginBottom: '16px' }}>
                Детали заказа
            </Title>
            <Divider />

            <ScrollContainer>
                <Row gutter={[16, 16]}>
                    {/* Продукты */}
                    {filteredProducts.length > 0 && (
                        <Col span={24}>
                            <Title level={4}>Продукты</Title>
                            {filteredProducts.map((product) => {
                                const matchedProduct = productData?.find(
                                    (p) => p.id === Number(product.product_id),
                                );
                                return (
                                    <Card
                                        key={product.product_id}
                                        style={{
                                            borderRadius: '4px',
                                            border: '1px solid #e0e0e0',
                                        }}
                                        bodyStyle={{ padding: '12px' }}
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            {matchedProduct?.name ||
                                                'Не найдено'}
                                        </Title>
                                        <Text>
                                            Количество: {product.quantity}
                                        </Text>
                                        <br />
                                        <Text strong>
                                            Цена:{' '}
                                            {matchedProduct?.price ||
                                                'Неизвестно'}{' '}
                                            сумм
                                        </Text>
                                    </Card>
                                );
                            })}
                        </Col>
                    )}

                    {/* Опции */}
                    {filteredOptions.length > 0 && (
                        <Col span={24}>
                            {filteredOptions.map((option) => {
                                const matchedOption = optionData?.find(
                                    (o) => o.id === Number(option.option_id),
                                );
                                return (
                                    <Card
                                        key={option.option_id}
                                        style={{
                                            marginBottom: '16px',
                                            borderRadius: '4px',
                                            border: '1px solid #e0e0e0',
                                        }}
                                        bodyStyle={{ padding: '12px' }}
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            {matchedOption?.name ||
                                                'Не найдено'}
                                        </Title>
                                        <Text>
                                            Количество: {option.quantity}
                                        </Text>
                                        <br />
                                        <Text strong>
                                            Цена:{' '}
                                            {matchedOption?.price ||
                                                'Неизвестно'}{' '}
                                            сумм
                                        </Text>
                                    </Card>
                                );
                            })}
                        </Col>
                    )}
                </Row>
            </ScrollContainer>
        </div>
    );
};
