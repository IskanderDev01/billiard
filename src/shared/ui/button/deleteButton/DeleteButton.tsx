import { Popconfirm } from 'antd';
import { memo } from 'react';
import { Button } from '../..';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    onConfirm: () => void;
    text: 'close' | 'delete';
};

const DeleteButton = ({ onConfirm, text }: Props) => {
    return (
        <Popconfirm
            onConfirm={() => onConfirm()}
            title="Вы действительно хотите завершить?"
        >
            {text === 'close' ? (
                <Button type="primary" danger>
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
