import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';

type Props = {
    onClick: () => void;
};

export const EditButton = ({ onClick }: Props) => {
    return (
        <Button
            onClick={onClick}
            type="primary"
            icon={<FontAwesomeIcon icon={faPencil} />}
        ></Button>
    );
};
