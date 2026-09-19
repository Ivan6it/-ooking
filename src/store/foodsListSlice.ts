import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Food, FoodStars } from '@/types/foods';

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

export const updateFoodViews = createAsyncThunk(
  'foodsList/updateFoodViews',
  async ({ id, views }: { id: number; views: number }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/foods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          views,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();

        return rejectWithValue(errorData || 'Не удалось обновить просмотры');
      }

      const data = await res.json();

      return data.food;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const updateFoodComments = createAsyncThunk(
  'foodsList/updateFoodComments',
  async (
    {
      id,
      comments,
    }: {
      id: number;
      comments: Array<{
        date: number;
        user: { id: number };
        comment: string;
        answers?: Array<{ date: number; user: { id: number }; comment: string }>;
      }>;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch('/api/foods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          comments,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();

        return rejectWithValue(errorData || 'Не удалось обновить комментарии');
      }

      const data = await res.json();

      return data.food;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const updateFoodStars = createAsyncThunk(
  'foodsList/updateFoodStars',
  async ({ id, stars }: { id: number; stars: FoodStars[] }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/foods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          stars,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();

        return rejectWithValue(errorData || 'Не удалось обновить звёзды');
      }

      const data = await res.json();

      return data.food;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const updateFood = createAsyncThunk(
  'foodsList/updateFood',
  async ({ id, likes }: { id: number; likes: number }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/foods', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          likes,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();

        return rejectWithValue(errorData || 'Не удалось обновить рецепт');
      }

      const data = await res.json();

      return data.food;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
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
      state.error = action.payload as {
        status?: number;
        message: string;
      };
    });

    builder.addCase(updateFood.fulfilled, (state, action) => {
      const updatedFood = action.payload;

      const foodIndex = state.foods.findIndex((food) => food.id === updatedFood.id);

      if (foodIndex !== -1) {
        state.foods[foodIndex] = updatedFood;
      }
    });
    builder.addCase(updateFoodViews.fulfilled, (state, action) => {
      const updatedFood = action.payload;

      const foodIndex = state.foods.findIndex((food) => food.id === updatedFood.id);

      if (foodIndex !== -1) {
        state.foods[foodIndex] = updatedFood;
      }
    });
    builder.addCase(updateFoodStars.fulfilled, (state, action) => {
      const updatedFood = action.payload;

      const foodIndex = state.foods.findIndex((food) => food.id === updatedFood.id);

      if (foodIndex !== -1) {
        state.foods[foodIndex] = updatedFood;
      }
    });
    builder.addCase(updateFoodComments.fulfilled, (state, action) => {
      const updatedFood = action.payload;

      const foodIndex = state.foods.findIndex((food) => food.id === updatedFood.id);

      if (foodIndex !== -1) {
        state.foods[foodIndex] = updatedFood;
      }
    });
  },
});

export default foodsListSlice.reducer;
