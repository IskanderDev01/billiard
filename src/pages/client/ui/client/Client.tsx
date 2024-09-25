import { Card } from '@/shared/ui';
import { Navbar } from '@/widgets/navbar/ui/Navbar';
import { NotActiveTable } from '../notActiveTable/NotActiveTable';
import { ActiveTable } from '../activeTable/ActiveTable';

export const Client = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-10">
                <div className="flex items-center justify-between">
                    <Card title="Свободные столы" className="w-[700px]">
                        <NotActiveTable />
                    </Card>
                    <Card title="Занятые столы" className="w-[700px]">
                        <ActiveTable />
                    </Card>
                </div>
            </div>
        </>
    );
};
