import { Event } from "../../types/Event";
import { formatDate } from "../../utils/formatDate";
import styles from "./EventItem.module.css";

interface EventItemProps {
  event: Event;
  onEdit: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

const EventItem = ({ event, onEdit, onDelete }: EventItemProps) => {
  const formatedDate = formatDate(event.date);

  return (
    <li className={styles.eventItem}>
      <h3 className={styles.eventTitle}>{event.title}</h3>
      <div className={styles.eventMeta}>
        <p className={styles.eventDate}>{formatedDate}</p>
        <p className={styles.eventCategory}>{event.category}</p>
      </div>
      <p className={styles.eventDescription}>{event.description}</p>
      <div className={styles.eventActions}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(event.id)}
        >
          Delete event
        </button>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit(event.id)}
        >
          Edit event
        </button>
      </div>
    </li>
  );
};

export default EventItem;
