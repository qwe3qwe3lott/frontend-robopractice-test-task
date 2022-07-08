import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tableReducer from './slices/table';

const rootReducer = combineReducers({
	table: tableReducer
});

const store = configureStore({
	reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch