import styled from 'styled-components';
import { lazy, memo, ReactNode } from 'react';

const CardAntd = lazy(() => import('antd/es/card/Card'));

const CustomCard = styled(CardAntd)`
    padding: 0px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export interface CardProps {
    children: ReactNode;
    title?: ReactNode;
    className?: string;
}

const Card = ({ children, title, className }: CardProps) => {
    return (
        <CustomCard title={title} className={className}>
            {children}
        </CustomCard>
    );
};

export default memo(Card);
