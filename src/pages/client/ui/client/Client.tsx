import { Card } from '@/shared/ui';
import { Navbar } from '@/widgets/navbar/ui/Navbar';
import { NotActiveTable } from '../notActiveTable/NotActiveTable';
import { ActiveTable } from '../activeTable/ActiveTable';

export const Client = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-0">
                    <Card
                        typeTitle="free"
                        title="Свободные столы"
                        className="w-full lg:w-[690px] mb-4 lg:mb-0"
                    >
                        <NotActiveTable />
                    </Card>
                    <Card
                        typeTitle="busy"
                        title="Занятые столы"
                        className="w-full lg:w-[690px]"
                    >
                        <ActiveTable />
                    </Card>
                </div>
            </div>
        </>
    );
};
