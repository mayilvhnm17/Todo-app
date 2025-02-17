// src/store/actions/todoActions.ts
import {createAction} from '@reduxjs/toolkit';

export const addTodo = createAction<string>('todos/addTodo');
export const toggleTodo = createAction<number>('todos/toggleTodo');
export const removeTodo = createAction<number>('todos/removeTodo');
