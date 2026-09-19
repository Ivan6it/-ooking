import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { DirectorySectionData, DirectoryComment } from '@/types/directorySection';

export interface DirectorySectionState {
  directorySection: DirectorySectionData[];
  loading: boolean;
  error: { status?: number; message: string } | string | null;
}

const initialState: DirectorySectionState = {
  directorySection: [],
  loading: false,
  error: null,
};

export const fetchDirectorySection = createAsyncThunk(
  'directorySection/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/directorySection');

      if (!res.ok) {
        return rejectWithValue('Не удалось загрузить справочник');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const updateDirectoryItemComments = createAsyncThunk(
  'directorySection/updateComments',
  async (
    {
      id,
      comments,
    }: {
      id: string;
      comments: DirectoryComment[];
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch('/api/directorySection', {
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

      return data.item;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

const directorySectionSlice = createSlice({
  name: 'directorySection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectorySection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDirectorySection.fulfilled, (state, action) => {
        state.loading = false;
        state.directorySection = action.payload;
      })

      .addCase(fetchDirectorySection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateDirectoryItemComments.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        for (const section of state.directorySection) {
          const itemIndex = section.products?.findIndex((product) => product.id === updatedItem.id);

          if (itemIndex !== -1 && itemIndex !== undefined) {
            section.products[itemIndex] = updatedItem;
            break;
          }
        }
      });
  },
});

export default directorySectionSlice.reducer;
