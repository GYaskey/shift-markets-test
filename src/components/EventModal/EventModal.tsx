import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, editEvent } from "../../redux/slices/eventsSlice";
import { Event } from "../../types/Event";
import { nanoid } from "nanoid";
import { selectEvents } from "../../redux/selectors/eventsSelectors";
import styles from "./EventModal.module.css";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: string | null; // Тепер передаємо тільки id події
}

const EventModal = ({ isOpen, onClose, eventToEdit }: EventModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    if (eventToEdit) {
      // Знаходимо подію для редагування
      const event = events.find((e) => e.id === eventToEdit);
      if (event) {
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
        setCategory(event.category);
      }
    } else {
      // Очищуємо форму для нової події
      setTitle("");
      setDescription("");
      setDate("");
      setCategory("");
    }
  }, [eventToEdit, events]);

  const handleSubmit = () => {
    if (!title || !date || !category) {
      alert("Title, date, and category are required!");
      return;
    }

    if (eventToEdit) {
      // Оновлення існуючої події
      dispatch(
        editEvent({
          id: eventToEdit,
          title,
          description,
          date,
          category,
        })
      );
    } else {
      // Додавання нової події
      const newEvent: Event = {
        id: nanoid(),
        title,
        description,
        date,
        category,
      };
      dispatch(addEvent(newEvent));
    }
    onClose(); // Закриваємо модалку після додавання/редагування
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.modal}>
      <h2 className={styles.modalTitle}>
        {eventToEdit ? "Edit Event" : "Add Event"}
      </h2>
      <form className={styles.modalForm}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Title</label>
          <input
            type="text"
            className={styles.inputField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Date</label>
          <input
            type="datetime-local"
            className={styles.inputField}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Category</label>
          <select
            className={styles.inputField}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Description</label>
          <input
            type="text"
            className={styles.inputField}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            {eventToEdit ? "Update Event" : "Add Event"}
          </button>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventModal;
