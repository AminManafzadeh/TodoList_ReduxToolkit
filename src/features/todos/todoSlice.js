import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

export const getAsyncTodos = createAsyncThunk(
  "todo/getAsyncTodos",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5001/alltodos");
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todo/addAsyncTodos",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5001/alltodos", {
        title: payload.title,
        id: Date.now(),
        completed: false,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteAsyncTodos = createAsyncThunk(
  "todo/deleteAsyncTodos",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5001/alltodos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todo/toggleAsyncTodos",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(
        `http://localhost:5001/alltodos/${payload.id}`,
        {
          title: payload.title,
          completed: payload.completed,
          id: payload.id,
        }
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(addAsyncTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
        state.error = "";
      })
      .addCase(addAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(deleteAsyncTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (item) => item.id !== action.payload.id
        );
        state.error = "";
      })
      .addCase(deleteAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(toggleAsyncTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        let allTodos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
          }

          return todo;
        });

        state.todos = allTodos;
        state.error = "";
      })
      .addCase(toggleAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
