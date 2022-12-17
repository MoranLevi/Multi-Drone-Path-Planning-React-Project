import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reduxLogger } from './logger';
import rootReducer from './reducers';

// configureStore: A friendly abstraction over the standard Redux createStore function, 
// that adds good defaults to the store setup for a better development experience.
export const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
    devTools: false
});

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middlewares
// - The Redux DevTools Extension is disabled

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;