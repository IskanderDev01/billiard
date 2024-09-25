/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { rtkApi } from '@/shared/api/rtkApi'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({}).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
