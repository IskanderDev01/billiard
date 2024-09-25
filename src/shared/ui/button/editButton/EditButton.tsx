import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Button } from '../..';

type Props = {
    onClick: () => void;
};

const EditButton = ({ onClick }: Props) => {
    return (
        <Button
            onClick={onClick}
            type="primary"
            icon={<FontAwesomeIcon icon={faPencil} />}
        ></Button>
    );
};

export default memo(EditButton);
