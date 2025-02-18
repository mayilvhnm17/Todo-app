import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  [date: string]: Todo[]; // Store todos by date (e.g., "2025-02-14": [ {id: 1, text: "Workout", completed: false} ])
}

const initialState: TodosState = {};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state: TodosState, action: PayloadAction<{ date: string; text: string }>) => {
      const { date, text } = action.payload;
      if (!state[date]) state[date] = [];
      state[date].push({ id: Date.now(), text, completed: false });
    },
    toggleTodo: (state: TodosState, action: PayloadAction<{ date: string; id: number }>) => {
      const { date, id } = action.payload;
      const todo = state[date]?.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state: TodosState, action: PayloadAction<{ date: string; id: number }>) => {
      const { date, id } = action.payload;
      state[date] = state[date]?.filter((t) => t.id !== id) || [];
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;