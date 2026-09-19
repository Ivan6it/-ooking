import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@/types/users';

export interface UserState {
  userData: User | Record<string, never>;
  loading: boolean;
  error: { status?: number; message: string } | string | null;
  isAuthModalOpen: boolean;
  authStatus: 'checking' | 'authenticated' | 'unauthenticated';
}

const initialState: UserState = {
  userData: {},
  loading: false,
  isAuthModalOpen: false,
  error: null,
  authStatus: 'checking',
};

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue(null);
    }

    try {
      const res = await fetch('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem('token');
        return rejectWithValue(null);
      }

      return await res.json();
    } catch {
      localStorage.removeItem('token');
      return rejectWithValue(null);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ mail, password }: { mail: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail, password }),
      });
      if (!res.ok) {
        const errorData = await res.text();
        return rejectWithValue(errorData || 'Invalid credentials');
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (err) {
      console.error('Login API Error:', err);
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    { name, mail, password }: { name: string; mail: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mail, password }),
      });

      if (!res.ok) {
        const textError = await res.text().catch(() => '');
        return rejectWithValue(textError || 'Registration failed');
      }

      const data = await res.json();

      localStorage.setItem('token', data.token);

      const userRes = await fetch('/api/users/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!userRes.ok) {
        throw new Error('Не удалось получить данные пользователя');
      }

      const userData = await userRes.json();

      return userData.user;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    {
      userData,
      image,
    }: {
      userData: Partial<User> & { id: number };
      image?: File | null;
    },
    { rejectWithValue },
  ) => {
    try {
      if (image) {
        const formData = new FormData();

        formData.append('id', String(userData.id));
        formData.append('image', image);

        Object.entries(userData).forEach(([key, value]) => {
          if (key === 'id') return;

          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        const res = await fetch('/api/users', {
          method: 'PUT',
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.text();
          return rejectWithValue(errorData || 'Не удалось обновить профиль');
        }

        const data = await res.json();

        return data.user;
      }

      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.text();
        return rejectWithValue(errorData || 'Не удалось обновить профиль');
      }

      const data = await res.json();

      return data.user;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Network error');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    logout(state) {
      state.userData = {};
      state.authStatus = 'unauthenticated';
      state.isAuthModalOpen = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.authStatus = 'authenticated';
      state.isAuthModalOpen = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { status?: number; message: string };
    });
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.authStatus = 'authenticated';
      state.isAuthModalOpen = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as { status?: number; message: string };
    });
    // Сохранение сессии
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.authStatus = 'checking';
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload.user;
      state.authStatus = 'authenticated';
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.userData = {};
      state.authStatus = 'unauthenticated';
    });
    // Обновление данных
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
export const { openAuthModal, closeAuthModal, logout } = userSlice.actions;
