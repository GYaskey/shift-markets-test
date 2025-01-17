import { EventsState } from "../redux/slices/eventsSlice";

export const loadState = (): { events: EventsState } | undefined => {
  try {
    const serializedState = localStorage.getItem("eventsState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

export const saveState = (state: { events: EventsState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("eventsState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};
