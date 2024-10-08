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
    typeTitle: 'busy' | 'free';
}

const Card = ({ children, title, className, typeTitle }: CardProps) => {
    return (
        <CustomCard
            title={
                <span
                    className={`${
                        typeTitle === 'busy' ? 'text-red-800' : 'text-green-800'
                    }`}
                >
                    {title}
                </span>
            }
            styles={{
                header: {
                    backgroundColor:
                        typeTitle === 'busy'
                            ? 'rgba(256, 0, 0, 0.1)'
                            : 'rgba(0, 256, 0, 0.1)',
                },
            }}
            className={className}
        >
            {children}
        </CustomCard>
    );
};

export default memo(Card);
