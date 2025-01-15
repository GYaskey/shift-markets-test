import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("eventsState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("eventsState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({
    events: store.getState().events,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
