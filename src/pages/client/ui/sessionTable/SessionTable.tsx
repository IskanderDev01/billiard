import { HistoryProductsModal, IRealHistoryData } from '@/entities';
import {
    useGetReportCheck,
    useGetReportSessionHistory,
} from '@/entities/client/api/clientApi';
import { convertMinutesToHoursAndMinutes, groupItems } from '@/shared';
import { Button, message, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

export const SessionTable = () => {
    const { data } = useGetReportSessionHistory();
    const [products, setProducts] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [check, { isLoading, isSuccess }] = useGetReportCheck();

    const handleGroped = (res) => {
        const groupedProducts = groupItems(res.products, 'product_id');
        const groupedOptions = groupItems(res.options, 'option_id');

        const combinedItems = [
            ...groupedProducts.map((product) => ({
                product_id: product.product_id,
                quantity: product.quantity,
            })),
            ...groupedOptions.map((option) => ({
                option_id: option.option_id,
                quantity: option.quantity,
            })),
        ];
        setProducts(combinedItems);
        setIsModalVisible(true);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('печатаем..');
        }
    }, [isSuccess]);

    const columns: TableProps<IRealHistoryData>['columns'] = [
        {
            title: 'стол',
            dataIndex: 'table_name',
            key: 'table_name',
        },
        {
            title: 'открытие',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'завершение',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: 'играли',
            dataIndex: 'duration',
            key: 'duration',
            render: (item) => <>{convertMinutesToHoursAndMinutes(item)}</>,
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
            key: 'products_income',
            render: (item, res) => (
                <div
                    className="cursor-pointer"
                    onClick={() => handleGroped(res)}
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
        {
            title: 'чек',
            dataIndex: 'check',
            key: 'check',
            render: (_, res) => (
                <div>
                    <Button onClick={() => check(res.id)} disabled={isLoading}>
                        распечатать чек
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={data}
                loading={Boolean(!data)}
                columns={columns}
                rowKey={(res) => res.id}
                pagination={{ pageSize: 10 }}
            />
            <HistoryProductsModal
                onClose={() => setIsModalVisible(false)}
                isModalVisible={isModalVisible}
                products={products}
            />
        </div>
    );
};
