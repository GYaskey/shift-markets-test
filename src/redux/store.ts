import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer } from "./slices/eventsSlice";
import { loadState, saveState } from "../utils/localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    events: store.getState().events,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
