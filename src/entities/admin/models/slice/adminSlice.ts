import { buildSlice } from '@/shared/lib/store';
import { AdminSchema } from '../types/adminTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '@/entities/client/models/types/clientTypes';

const initialState: AdminSchema = {
    reportTableData: [],
};

const adminSlice = buildSlice({
    name: 'admin',
    initialState,
    reducers: {
        setReportTableData: (state, action: PayloadAction<IOrder[]>) => {
            state.reportTableData = action.payload;
        },
    },
});

export const {
    actions: adminActions,
    reducer: adminReducer,
    useActions: useAdminActions,
} = adminSlice;
