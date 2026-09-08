import { configureStore } from '@reduxjs/toolkit';
import foodsListReducer from './store/foodsListSlice';
import userReducer from '@/store/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fetchFoods } from '@/store/foodsListSlice';
import { fetchCurrentUser } from '@/store/userSlice';

const store = configureStore({
  reducer: {
    foodsList: foodsListReducer,
    user: userReducer,
  },
});

setupListeners(store.dispatch);
store.dispatch(fetchFoods());
store.dispatch(fetchCurrentUser());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
