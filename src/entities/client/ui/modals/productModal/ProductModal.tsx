import React, { useState } from 'react';
import { useGetProducts } from '@/shared/api/apies';
import { updateOrder } from '../../../api/clientApi';
import styled from 'styled-components';
import { Modal, Button } from 'antd'

interface ProductModalProps {
    orderId: number;
    visible: boolean;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    orderId,
    visible,
    onClose,
}) => {
    const [updateTableOrder] = updateOrder();
    const { data: products } = useGetProducts();
    const [selectedProducts, setSelectedProducts] = useState<
        { id: number; optionId?: number; quantity: number }[]
    >([]);

    const handleAddProduct = (productId: number, optionId?: number) => {
        const existingProduct = selectedProducts.find(
            (p) => p.id === productId && p.optionId === optionId,
        );

        if (existingProduct) {
            setSelectedProducts(
                selectedProducts.map((p) =>
                    p.id === productId && p.optionId === optionId
                        ? { ...p, quantity: p.quantity + 1 }
                        : p,
                ),
            );
        } else {
            setSelectedProducts([
                ...selectedProducts,
                { id: productId, optionId, quantity: 1 },
            ]);
        }
    };

    const handleRemoveProduct = (productId: number, optionId?: number) => {
        const existingProduct = selectedProducts.find(
            (p) => p.id === productId && p.optionId === optionId,
        );

        if (existingProduct && existingProduct.quantity > 0) {
            if (existingProduct.quantity === 1) {
                setSelectedProducts(
                    selectedProducts.filter(
                        (p) => !(p.id === productId && p.optionId === optionId),
                    ),
                );
            } else {
                setSelectedProducts(
                    selectedProducts.map((p) =>
                        p.id === productId && p.optionId === optionId
                            ? { ...p, quantity: p.quantity - 1 }
                            : p,
                    ),
                );
            }
        }
    };

    const handleSubmit = () => {
        const products = selectedProducts
            .filter((product) => !product.optionId)
            .reduce<number[]>((acc, product) => {
                for (let i = 0; i < product.quantity; i++) {
                    acc.push(product.id);
                }
                return acc;
            }, []);

        const options = selectedProducts
            .filter((product) => product.optionId)
            .reduce<number[]>((acc, product) => {
                if (product.optionId) {
                    for (let i = 0; i < product.quantity; i++) {
                        acc.push(product.optionId);
                    }
                }
                return acc;
            }, []);

        const payload = {
            order_id: orderId,
            products,
            options,
            status: true,
        };

        updateTableOrder(payload);

        onClose();
        setSelectedProducts([]);
    };

    return (
        <Modal
            title="Выберите продукты"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <ProductGrid>
                {products?.map((product) => (
                    <ProductCard key={product.id}>
                        <ProductImage
                            src={`http://176.221.29.165:2222${product.image}`}
                            alt={product.name}
                        />
                        <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            {!product.options?.length && (
                                <>
                                    <ProductPrice>
                                        {product.price} сумм
                                    </ProductPrice>
                                    <OptionActions>
                                        <Button
                                            onClick={() =>
                                                handleRemoveProduct(product.id)
                                            }
                                        >
                                            -
                                        </Button>
                                        <Quantity>
                                            {selectedProducts.find(
                                                (p) => p.id === product.id,
                                            )?.quantity || 0}
                                        </Quantity>
                                        <Button
                                            onClick={() =>
                                                handleAddProduct(product.id)
                                            }
                                        >
                                            +
                                        </Button>
                                    </OptionActions>
                                </>
                            )}
                        </ProductInfo>

                        {product.options?.length ? (
                            product.options.map((option) => (
                                <OptionCard key={option.id}>
                                    <OptionName>
                                        <span className="mr-2">
                                            {option.name}
                                        </span>{' '}
                                        {option.price} сумм
                                    </OptionName>
                                    <OptionActions>
                                        <Button
                                            onClick={() =>
                                                handleRemoveProduct(
                                                    product.id,
                                                    option.id,
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                        <Quantity>
                                            {selectedProducts.find(
                                                (p) =>
                                                    p.id === product.id &&
                                                    p.optionId === option.id,
                                            )?.quantity || 0}
                                        </Quantity>
                                        <Button
                                            onClick={() =>
                                                handleAddProduct(
                                                    product.id,
                                                    option.id,
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </OptionActions>
                                </OptionCard>
                            ))
                        ) : (
                            <></>
                        )}
                    </ProductCard>
                ))}
            </ProductGrid>
            <SubmitButton onClick={handleSubmit}>Добавить заказ</SubmitButton>
        </Modal>
    );
};


const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
`;

const ProductCard = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    background-color: #fff;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 12px;
`;

const ProductInfo = styled.div`
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ProductPrice = styled.div`
    color: #000;
`;

const OptionCard = styled.div`
    width: full;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding: 8px;
    background-color: #f9f9f9;
    border-radius: 4px;
`;

const OptionName = styled.div`
    font-size: 16px;
`;

const OptionActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Quantity = styled.span`
    font-size: 16px;
`;

const SubmitButton = styled(Button)`
    margin-top: 24px;
    width: 100%;
    background-color: #4caf50;
    color: white;
`;
