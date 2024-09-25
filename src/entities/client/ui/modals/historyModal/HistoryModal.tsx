import { useGetOrder } from '@/entities/client/api/clientApi';
import { useGetTable } from '@/shared/api/apies';
import { Modal, Spin } from 'antd';

export interface HistoryModalProps {
    orderId: number;
    visible: boolean;
    onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
    onClose,
    orderId,
    visible,
}) => {
    const { data, isLoading } = useGetOrder(orderId);
    const { data: tableData, isLoading: isTableLoading } = useGetTable({
        id: data?.table_id,
    });

    if (isLoading || isTableLoading) {
        return (
            <Modal open={visible} onCancel={onClose} footer={null}>
                <Spin size="large" />
            </Modal>
        );
    }

    const calculateDuration = (date: string, time: string) => {
        if (!date || !time) return { totalMinutes: 0, display: 'Неизвестно' };

        const startDateTimeString = `${date}T${time}`; // Соединяем дату и время
        const start = new Date(startDateTimeString); // Дата и время открытия стола

        if (isNaN(start.getTime()))
            return { totalMinutes: 0, display: 'Неизвестно' };

        const now = new Date(); // Текущая дата и время
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

    const duration =
        data?.date && data?.start_time
            ? calculateDuration(data.date, data.start_time)
            : { totalMinutes: 0, display: 'Неизвестно' };

    const tablePrice = tableData?.price || 0;
    const pricePerMinute = tablePrice / 60;
    const additionalCost = pricePerMinute * duration.totalMinutes;
    const totalCost = (data?.total || 0) + additionalCost;

    const groupItems = (items: any[], key1: string, key2: string) => {
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
                <>
                    История{' '}
                    <span className="font-bold ml-1">{data?.table_name}</span>
                </>
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
                        <strong>Статус стола:</strong>{' '}
                        {data?.table_status ? 'Занят' : 'Свободен'}
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
                    <ul className="list-disc pl-5">
                        {groupedProducts.map((product) => (
                            <li
                                key={product.product_id}
                                className="py-1 flex justify-between text-[16px]"
                            >
                                <span>
                                    {product.product_name} x{product.count}
                                </span>
                                <span>
                                    {product.price * product.count} сумм
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Продукты не найдены.</p>
                )}

                {/* <h3 className="mt-4 text-md font-semibold border-b pb-1">
                    Опции
                </h3> */}
                {groupedOptions.length ? (
                    <ul className="list-disc pl-5 text-[16px]">
                        {groupedOptions.map((option) => (
                            <li
                                key={option.option_id}
                                className="py-1 flex justify-between"
                            >
                                <span>
                                    {option.option_name} x{option.count}
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
