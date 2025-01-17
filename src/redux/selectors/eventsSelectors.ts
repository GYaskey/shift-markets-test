import { RootState } from "../store";

export const selectEvents = (state: RootState) => state.events.events;
export const selectIsLoading = (state: RootState) => state.events.isLoading;
export const selectError = (state: RootState) => state.events.error;
