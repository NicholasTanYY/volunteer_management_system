import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './reducers/usernameSlice';
import selectedDateReducer from './reducers/selectedDateSlice';

const store = configureStore({
    reducer: {
        username: usernameReducer,
        selectedDate: selectedDateReducer,
        // Add more slices as needed
    },
    // Additional configuration options can be added here
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch