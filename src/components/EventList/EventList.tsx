import { useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/slices/eventsSlice"; // Імпорт дії для видалення події
import EventItem from "../EventItem/EventItem"; // Імпорт компоненту події
import { Event } from "../../types/Event"; // Імпортуємо тип Event

interface EventListProps {
  events: Event[]; // Передаємо відфільтровані події
  openModalForEditingEvent: (eventId: string) => void; // Для відкриття модалки редагування
}

const EventList = ({ events, openModalForEditingEvent }: EventListProps) => {
  const dispatch = useDispatch();

  // Функція для видалення події
  const handleDeleteEvent = (id: string) => {
    dispatch(deleteEvent(id)); // Викликаємо дію для видалення події
  };

  if (events.length === 0) {
    return <p>No events match the criteria. Try adjusting the filters!</p>; // Якщо немає відповідних подій
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
