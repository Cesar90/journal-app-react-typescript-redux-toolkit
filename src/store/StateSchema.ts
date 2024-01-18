import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { InitalState } from './auth';
// import { CounterSchema } from 'entities/Counter';
// import { UserSchema } from 'entities/User/model/types/user';
// import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';

export interface StateSchema {
    auth: RequireOnly<InitalState, "status">;
    journal: InitalStateJournal;
}

export type StateSchemaKey = keyof StateSchema;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}
