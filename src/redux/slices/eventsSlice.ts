import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types/Event";
import { toast } from "react-toastify";

interface EventsState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      try {
        const isOverlapping = state.events.some(
          (event) =>
            event.date === action.payload.date && event.id !== action.payload.id
        );

        if (isOverlapping) {
          toast.error("Event overlaps with an existing event");
          return;
        }

        state.events.push(action.payload);
        toast.success("Event successfully added!");
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Error adding event");
          state.error = error.message;
        } else {
          toast.error("Unknown error occurred");
          state.error = "Unknown error occurred";
        }
      }
    },

    editEvent(state, action: PayloadAction<Event>) {
      try {
        const index = state.events.findIndex((e) => e.id === action.payload.id);

        if (index !== -1) {
          state.events[index] = action.payload;
          toast.success("Event successfully updated!");
        } else {
          toast.error("Event not found");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Error editing event");
          state.error = error.message;
        } else {
          toast.error("Unknown error occurred");
          state.error = "Unknown error occurred";
        }
      }
    },

    deleteEvent(state, action: PayloadAction<string>) {
      try {
        const index = state.events.findIndex((e) => e.id === action.payload);

        if (index !== -1) {
          state.events.splice(index, 1);
          toast.success("Event successfully deleted!");
        } else {
          toast.error("Event not found for deletion.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Error deleting event");
          state.error = error.message;
        } else {
          toast.error("Unknown error occurred");
          state.error = "Unknown error occurred";
        }
      }
    },

    clearError(state) {
      state.error = null;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { addEvent, editEvent, deleteEvent, clearError, setLoading } =
  eventSlice.actions;

export const eventReducer = eventSlice.reducer;
