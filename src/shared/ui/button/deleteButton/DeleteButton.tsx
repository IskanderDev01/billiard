import { Popconfirm } from 'antd';
import { memo } from 'react';
import { Button } from '../..';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    onConfirm: () => void;
    text: 'close' | 'delete';
    disabled?: boolean;
};

const DeleteButton = ({ onConfirm, text, disabled }: Props) => {
    return (
        <Popconfirm
            onConfirm={() => onConfirm()}
            title={
                text === 'close'
                    ? 'Вы действительно хотите завершить?'
                    : 'Вы действительно хотите удалить?'
            }
        >
            {text === 'close' ? (
                <Button type="primary" disabled={disabled} danger>
                    Завершить
                </Button>
            ) : (
                <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    danger
                ></Button>
            )}
        </Popconfirm>
    );
};

export default memo(DeleteButton);
