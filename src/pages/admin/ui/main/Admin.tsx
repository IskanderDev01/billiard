import { HistoryProductsModal, IOrder, IReportTable } from '@/entities';
import { useGetReportTables } from '@/entities/admin/api/adminApi';
import { useAdminActions } from '@/entities/admin/models/slice/adminSlice';
import { convertMinutesToHoursAndMinutes, groupItems } from '@/shared'
import { getDefaultDateMonth } from '@/shared/lib/defaultDate/defaultDate';
import { DatePicker, DatePickerProps, Radio, Table, TableProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setReportTableData } = useAdminActions();
    const [selectedProducts, setSelectedProducts] = useState<any>([]);
    const [date, setDate] = useState<string>('');
    const { data } = useGetReportTables(date || getDefaultDateMonth());
    const [isFilter, setIsFilter] = useState<boolean>(true);

    const onChangeMonth: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDate(dateString);
        }
    };
    const onChange: DatePickerProps['onChange'] = (
        _,
        dateString: string | string[],
    ) => {
        if (typeof dateString === 'string') {
            setDate(dateString);
        }
    };
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
        setSelectedProducts(combinedItems);
        setIsModalVisible(true);
    };
    const reportTableColumns: TableProps<IReportTable>['columns'] = [
        {
            title: <div className="text-center">дата</div>,
            dataIndex: 'date',
            key: 'date',
            render: (item) => (
                <div className="text-center">{item.split(' ')[0]}</div>
            ),
        },
        {
            title: <div className="text-center">стол</div>,
            dataIndex: 'table_name',
            key: 'table_name',
            render: (item) => <div className="text-center">{item}</div>,
        },
        {
            title: <div className="text-center">наигранное время</div>,
            dataIndex: 'total_play_time',
            key: 'total_play_time',
            render: (item) => <div className="text-center">{convertMinutesToHoursAndMinutes(item)}</div>,
        },
        {
            title: <div className="text-center">доход от стола</div>,
            dataIndex: 'table_income',
            key: 'table_income',
            render: (item) => <div className="text-center">{item} сумм</div>,
        },
        {
            title: <div className="text-center">доход от продуктов</div>,
            dataIndex: 'products_income',
            key: 'products_income',
            render: (item, res) => (
                <div
                    className="text-center cursor-pointer products-income"
                    onClick={() => {
                        setSelectedProducts(res.products);
                        setIsModalVisible(true);
                    }}
                >
                    {item} сумм
                </div>
            ),
        },
        {
            title: <div className="text-center">общий доход</div>,
            dataIndex: 'total_income',
            key: 'total_income',
            render: (item) => <div className="text-center">{item} сумм</div>,
        },
    ];
    const columns: TableProps<IOrder>['columns'] = [
        {
            title: 'дата',
            dataIndex: 'date',
            key: 'date',
            render: (item) => <div className="w-24">{item}</div>,
        },
        {
            title: 'стол',
            dataIndex: 'table_name',
            key: 'table_name',
            render: (item) => <div className="w-14">{item}</div>,
        },
        {
            title: 'цена',
            dataIndex: 'table_price',
            key: 'table_price',
            render: (item) => <div className="w-24">{item} сумм</div>,
        },
        {
            title: 'время открытия',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (item) => <div className="w-24">{item}</div>,
        },
        {
            title: 'время завершения',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (item) => <div className="w-24">{item}</div>,
        },
        {
            title: 'наигранное время',
            dataIndex: 'duration',
            key: 'duration',
            render: (item) => <div className="w-24">{convertMinutesToHoursAndMinutes(item)}</div>,
        },
        {
            title: 'доход от стола',
            dataIndex: 'table_income',
            key: 'table_income',
            render: (item) => <div className="w-28">{item} сумм</div>,
        },
        {
            title: 'доход от продуктов',
            dataIndex: 'products_income',
            key: 'product_income',
            render: (item, res) => (
                <div
                    className="w-28 cursor-pointer"
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
            render: (item) => <div className="w-28 text-end">{item} сумм</div>,
        },
    ];
    const onChangeFilter = (e) => {
        setIsFilter(e.target.value === 'a');
    };

    return (
        <div>
            <span className="flex justify-between mb-6">
                <span className="text-2xl font-bold text-slate-800">
                    Статистика
                </span>
                <div>
                    <Radio.Group
                        className="mr-2"
                        onChange={onChangeFilter}
                        defaultValue="a"
                    >
                        <Radio.Button value="a">По столу</Radio.Button>
                        <Radio.Button value="b">Все</Radio.Button>
                    </Radio.Group>
                    <DatePicker
                        allowClear={false}
                        placeholder="Выберите месяц"
                        onChange={onChangeMonth}
                        picker="month"
                        className="font-semibold"
                        style={{ width: '170px' }}
                    />
                    <DatePicker
                        onChange={onChange}
                        allowClear={false}
                        className="ml-2 font-semibold"
                        placeholder="Выберите день"
                        style={{ width: '160px' }}
                    />
                </div>
            </span>
            {isFilter ? (
                <Table
                    size="middle"
                    dataSource={data}
                    loading={Boolean(!data)}
                    columns={reportTableColumns}
                    pagination={{ pageSize: 10 }}
                    rowKey={(res) => res.id}
                    onRow={(res) => ({
                        onClick: (event) => {
                            const target = event.target as HTMLElement;
                            if (target.closest('.products-income')) {
                                setSelectedProducts(res.products);
                                setIsModalVisible(true);
                            } else if (!isModalVisible) {
                                setReportTableData(res.orders);
                                navigate(`/admin/report_table`);
                            }
                        },
                        className: 'hover:cursor-pointer',
                    })}
                />
            ) : (
                <>
                    <div
                        className="table-header flex p-4"
                        style={{
                            backgroundColor: '#f0f0f0',
                            borderBottom: '1px solid #e0e0e0',
                        }}
                    >
                        <div>Дата</div>
                        <div className="ml-24">Стол</div>
                        <div className="ml-14">цена</div>
                        <div className="ml-24"> открытие</div>
                        <div className="ml-10">завершение</div>
                        <div className="ml-10">время игры</div>
                        <div className="ml-10">Доход от стола</div>
                        <div className="ml-10">Доход от продуктов</div>
                        <div className="ml-10">Общий доход</div>
                    </div>
                    <div className="overflow-y-auto max-h-[500px]">
                        {data?.map((item) => (
                            <Table
                                showHeader={false}
                                key={item.id}
                                dataSource={item?.orders}
                                loading={Boolean(!data)}
                                columns={columns}
                                pagination={false}
                                rowKey={(res) => res.id}
                            />
                        ))}
                    </div>
                </>
            )}

            <HistoryProductsModal
                onClose={() => setIsModalVisible(false)}
                isModalVisible={isModalVisible}
                products={selectedProducts}
            />
        </div>
    );
};
