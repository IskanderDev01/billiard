import {
    updateOrderProductCancel,
    useGetOrder,
} from '@/entities/client/api/clientApi';
import {
    IOrderProduct,
    IOrderOption,
} from '@/entities/client/models/types/clientTypes';
import { useGetTable } from '@/shared/api/apies';
import { Button, Modal, Popconfirm, Spin } from 'antd';

export interface HistoryModalProps {
    orderId: number;
    visible: boolean;
    onClose: () => void;
}

const calculateDuration = (date: string, time: string) => {
    if (!date || !time) return { totalMinutes: 0, display: 'Неизвестно' };

    const startDateTimeString = `${date}T${time}`;
    const start = new Date(startDateTimeString);

    if (isNaN(start.getTime()))
        return { totalMinutes: 0, display: 'Неизвестно' };

    const now = new Date();
    const durationInMinutes = Math.floor(
        (now.getTime() - start.getTime()) / (1000 * 60),
    );

    const hoursPassed = Math.floor(durationInMinutes / 60);
    const minutesPassed = durationInMinutes % 60;

    return {
        totalMinutes: durationInMinutes,
        display: `${hoursPassed} час${
            hoursPassed === 1 ? '' : 'а'
        } и ${minutesPassed} минут${minutesPassed === 1 ? '' : 'ы'}`,
    };
};

export const HistoryModal: React.FC<HistoryModalProps> = ({
    onClose,
    orderId,
    visible,
}) => {
    const { data, isLoading } = useGetOrder(orderId);
    const { data: tableData, isLoading: isTableLoading } = useGetTable(
        data?.table_id,
        {
            skip: !data?.table_id,
        },
    );
    const [cancelProduct] = updateOrderProductCancel();

    if (isLoading || isTableLoading) {
        return (
            <Modal
                width={800}
                className="flex justify-center items-center"
                open={visible}
                footer={null}
            >
                <Spin size="large" />
            </Modal>
        );
    }

    const duration =
        data?.date && data?.start_time
            ? calculateDuration(data.date, data.start_time)
            : { totalMinutes: 0, display: 'Неизвестно' };

    const tablePrice = tableData?.price || 0;
    const pricePerMinute = tablePrice / 60;
    const additionalCost = pricePerMinute * duration.totalMinutes;
    const totalCost = (data?.total || 0) + additionalCost;

    const groupItems = (
        items: IOrderProduct[] | IOrderOption[],
        key1: string,
        key2: string,
    ) => {
        return items.reduce((acc, item) => {
            const found = acc.find(
                (i) => i[key1] === item[key1] && i[key2] === item[key2],
            );
            if (found) {
                found.count += 1;
            } else {
                acc.push({ ...item, count: 1 });
            }
            return acc;
        }, []);
    };

    const handleCancelProduct = (product_id: number) => {
        const data = {
            order_id: orderId,
            products: [product_id],
            options: [],
            status: true,
        };
        cancelProduct(data);
    };

    const handleCancelOption = (option_id: number) => {
        const data = {
            order_id: orderId,
            products: [],
            options: [option_id],
            status: true,
        };
        cancelProduct(data);
    };

    const groupedProducts = groupItems(
        data?.products || [],
        'product_id',
        'product_name',
    );

    const groupedOptions = groupItems(
        data?.options || [],
        'option_id',
        'option_name',
    );

    return (
        <Modal
            title={
                <div>
                    История{' '}
                    <span className="font-bold ml-1">{data?.table_name}</span>
                </div>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div className="p-4">
                <h2 className="text-lg font-bold border-b pb-2">
                    Детали заказа
                </h2>

                <div className="flex justify-between items-center mt-2">
                    <p>
                        <strong>Статус стола:</strong> Играют
                    </p>
                    <p>
                        <strong>Время открытия:</strong> {data?.start_time}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <p>
                        <strong>Стол:</strong>{' '}
                        <span className="text-[18px] font-semibold">
                            {additionalCost.toFixed(2)} сумм
                        </span>
                    </p>
                    <p>
                        <strong>Продолжительность:</strong> {duration.display}
                    </p>
                </div>

                <h3 className="mt-4 text-md font-semibold border-b pb-1">
                    Купленные продукты
                </h3>
                {groupedProducts.length ? (
                    <ul className="list-disc">
                        {groupedProducts.map((product) => (
                            <li
                                key={product.product_id}
                                className="py-1 flex justify-between text-[16px]"
                            >
                                <span>
                                    <Popconfirm
                                        onConfirm={() =>
                                            handleCancelProduct(
                                                product.product_id,
                                            )
                                        }
                                        title="Вы действительно хотите отменить продукт?"
                                    >
                                        <Button
                                            size="small"
                                            className="px-2 rounded-full"
                                        >
                                            -
                                        </Button>
                                    </Popconfirm>
                                    <span className="pl-2">
                                        {product.product_name} x{product.count}
                                    </span>
                                </span>
                                <span>
                                    {product.price * product.count} сумм
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}

                {groupedOptions.length ? (
                    <ul className="list-disc text-[16px]">
                        {groupedOptions.map((option) => (
                            <li
                                key={option.option_id}
                                className="py-1 flex justify-between"
                            >
                                <span>
                                    <Popconfirm
                                        onConfirm={() =>
                                            handleCancelOption(option.option_id)
                                        }
                                        title="Вы действительно хотите отменить продукт?"
                                    >
                                        <Button
                                            size="small"
                                            className="px-2 rounded-full"
                                        >
                                            -
                                        </Button>
                                    </Popconfirm>
                                    <span className="pl-2">
                                        {option.option_name} x{option.count}
                                    </span>
                                </span>
                                <span>{option.price * option.count} сумм</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}
                <div className="text-[18px] pt-4">
                    <strong>Общая сумма:</strong>{' '}
                    <span className="font-semibold">
                        {totalCost.toFixed(2)} сумм
                    </span>
                </div>
            </div>
        </Modal>
    );
};
