import { Event } from "../../types/Event";

interface EventItemProps {
  event: Event;
  onEdit: (eventId: string) => void; // Приймаємо функцію для редагування
  onDelete: (eventId: string) => void; // Приймаємо функцію для видалення
}

const EventItem = ({ event, onEdit, onDelete }: EventItemProps) => {
  return (
    <li>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.category}</p>
      <button type="button" onClick={() => onDelete(event.id)}>
        Delete event
      </button>
      <button type="button" onClick={() => onEdit(event.id)}>
        Edit event
      </button>
    </li>
  );
};

export default EventItem;
