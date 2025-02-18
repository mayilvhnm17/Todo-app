// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import todoReducer from "./reducers/todoReducer";
import { createTransform } from 'redux-persist';

const serialize = (state: any) => {
  return JSON.stringify(state); // Serialize state into a string
};
const deserialize = (state: string) => {
  return JSON.parse(state); // Deserialize state back to an object
};

const todoTransform = createTransform(
  (inboundState: any) => serialize(inboundState), // Serialize on save
  (outboundState: any) => deserialize(outboundState), // Deserialize on load
);

// Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [todoTransform],
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
