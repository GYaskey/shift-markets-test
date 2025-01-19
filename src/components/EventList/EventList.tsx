import { useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/slices/eventsSlice";
import EventItem from "../EventItem/EventItem";
import { Event } from "../../types/Event";
import styles from "./EventList.module.css";

interface EventListProps {
  events: Event[];
  openModalForEditingEvent: (eventId: string) => void;
}

const EventList = ({ events, openModalForEditingEvent }: EventListProps) => {
  const dispatch = useDispatch();

  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id));
  };

  if (events.length === 0) {
    return <p className={styles.noEventsMessage}>No events found!</p>;
  }

  return (
    <div className={styles.eventList}>
      {events.map((event) => (
        <EventItem
          event={event}
          onEdit={openModalForEditingEvent}
          onDelete={handleDeleteEvent}
        />
      ))}
    </div>
  );
};

export default EventList;
