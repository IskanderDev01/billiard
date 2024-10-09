import { buildSelector } from '@/shared/lib/store';

export const [useGetReportTableData, reportTableData] = buildSelector(
    (state) => state.admin?.reportTableData ?? [],
);
