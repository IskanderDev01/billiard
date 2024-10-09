import { HistoryProductsModal, IOrder } from '@/entities';
import { useGetReportTableData } from '@/entities/admin/models/selectors/adminSelectors';
import { Button, Table, TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const aggregateProductsAndOptions = (reportTableData) => {
    return reportTableData.map((item) => {
        const aggregatedProducts = item.products.reduce((acc, product) => {
            const existingProduct = acc.find(
                (p) => p.product_id === product.product_id,
            );
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                acc.push({ product_id: product.product_id, quantity: 1 });
            }
            return acc;
        }, []);

        const aggregatedOptions = item.options.reduce((acc, option) => {
            const existingOption = acc.find(
                (o) => o.option_id === option.option_id,
            );
            if (existingOption) {
                existingOption.quantity += 1;
            } else {
                acc.push({ option_id: option.option_id, quantity: 1 });
            }
            return acc;
        }, []);

        return {
            ...item,
            aggregatedProducts,
            aggregatedOptions,
        };
    });
};

export const ReportTable = () => {
    const reportTableData = useGetReportTableData();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProducts, setModalProducts] = useState<any[]>([]);

    const aggregatedData = aggregateProductsAndOptions(reportTableData);

    const handleOpenModal = (
        aggregatedProducts: any[],
        aggregatedOptions: any[],
    ) => {
        const productsToShow = [
            ...aggregatedProducts.map((product) => ({
                product_id: product.product_id,
                quantity: String(product.quantity),
            })),
            ...aggregatedOptions.map((option) => ({
                option_id: option.option_id,
                quantity: String(option.quantity),
            })),
        ];
        setModalProducts(productsToShow);
        setIsModalVisible(true);
    };

    const columns: TableProps<IOrder>['columns'] = [
        {
            title: 'дата',
            dataIndex: 'date',
            key: 'date',
        },
        { title: 'стол', dataIndex: 'table_name', key: 'table_name' },
        {
            title: 'цена',
            dataIndex: 'table_price',
            key: 'table_price',
            render: (item) => <>{item} сумм</>,
        },
        { title: 'время открытия', dataIndex: 'start_time', key: 'start_time' },
        { title: 'время завершения', dataIndex: 'end_time', key: 'end_time' },
        {
            title: 'наигранное время',
            dataIndex: 'duration',
            key: 'duration',
            render: (item) => <>{item} минут</>,
        },
        {
            title: 'доход от стола',
            dataIndex: 'table_income',
            key: 'table_income',
            render: (item) => <>{item} сумм</>,
        },
        {
            title: 'доход от продуктов',
            dataIndex: 'products_income',
            key: 'product_income',
            render: (item, record) => (
                <div
                    className="cursor-pointer"
                    onClick={() =>
                        handleOpenModal(
                            record.aggregatedProducts,
                            record.aggregatedOptions,
                        )
                    }
                >
                    {item} сумм
                </div>
            ),
        },
        {
            title: 'общий доход',
            dataIndex: 'total',
            key: 'total',
            render: (item) => <>{item} сумм</>,
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">История</h2>
                <Button onClick={() => navigate(-1)}>назад</Button>
            </div>
            <Table
                loading={Boolean(!reportTableData)}
                dataSource={aggregatedData}
                pagination={{ pageSize: 10 }}
                columns={columns}
                rowKey={(res) => res.id}
                size="middle"
            />
            <HistoryProductsModal
                onClose={() => setIsModalVisible(false)}
                isModalVisible={isModalVisible}
                products={modalProducts}
            />
        </div>
    );
};
