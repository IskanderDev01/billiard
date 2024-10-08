import { HistoryProductsModal } from '@/entities';
import { DatePicker, DatePickerProps, Modal } from 'antd';
import { useState } from 'react';

export const Admin = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProducts] = useState([]);
    const [, setDate] = useState('');

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

    return (
        <div>
            <h2 className="flex justify-between text-2xl font-bold text-slate-800 mb-6">
                <span>Статистика</span>
                <div>
                    <DatePicker
                        allowClear={false}
                        placeholder="Выберите месяц"
                        onChange={onChangeMonth}
                        picker="month"
                        style={{ width: '200px' }}
                    />
                    <DatePicker
                        onChange={onChange}
                        allowClear={false}
                        className="ml-2"
                        placeholder="Выберите день"
                        style={{ width: '200px' }}
                    />
                </div>
            </h2>

            <Modal
                title="Детали заказа"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                <HistoryProductsModal products={selectedProducts} />
            </Modal>
        </div>
    );
};
