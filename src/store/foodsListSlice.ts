import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Food } from '@/types/foods';

export interface FoodsState {
  foods: Food[];
  loading: boolean;
  error: { status?: number; message: string } | string | null;
}

const initialState: FoodsState = {
  foods: [],
  loading: false,
  error: null,
};

export const fetchFoods = createAsyncThunk(
  'foodsList/fetchFoods',
  async (_, { rejectWithValue }) => {
    const res = await fetch('/api/foods');
    if (!res.ok) {
      return rejectWithValue({
        status: res.status,
        message: 'Failed to fetch foods',
      });
    }
    const data = await res.json();
    return data;
  },
);

const foodsListSlice = createSlice({
  name: 'foodsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoods.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    });
    builder.addCase(fetchFoods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { status?: number; message: string };
    });
  },
});

export default foodsListSlice.reducer;
