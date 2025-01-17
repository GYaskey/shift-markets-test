import { useSelector } from "react-redux";
import { selectEvents } from "../../redux/selectors/eventsSelectors";
import EventItem from "../EventItem/EventItem";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/slices/eventsSlice"; // Імпортуємо дію для видалення події

interface EventListProps {
  openModalForEditingEvent: (eventId: string) => void; // Для відкриття модалки редагування
}

const EventList = ({ openModalForEditingEvent }: EventListProps) => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

  // Функція для видалення події
  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id)); // Викликаємо дію для видалення події
  };

  if (events.length === 0) {
    return <p>No events available. Please add some events!</p>;
  }

  return (
    <div>
      <ul>
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onEdit={openModalForEditingEvent} // Функція для редагування
            onDelete={handleDeleteEvent} // Функція для видалення
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
