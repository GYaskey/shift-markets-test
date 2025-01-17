import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addEvent, editEvent } from "../../redux/slices/eventsSlice";
import { Event } from "../../types/Event";
import { nanoid } from "nanoid";

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

  useEffect(() => {
    if (eventToEdit) {
      // Якщо ми редагуємо, заповнюємо дані існуючої події
      const eventToEditData = {}; // Тут ви маєте отримати подію з Redux або іншого сховища за eventToEdit (id)
      setTitle(eventToEditData.title);
      setDescription(eventToEditData.description);
      setDate(eventToEditData.date);
      setCategory(eventToEditData.category);
    } else {
      // Очистити форму для додавання нового івенту
      setTitle("");
      setDescription("");
      setDate("");
      setCategory("");
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    if (eventToEdit) {
      // Оновлення існуючої події
      dispatch(
        editEvent({ ...eventToEdit, title, description, date, category })
      );
    } else {
      // Додавання нової події
      const newEvent: Event = {
        id: nanoid(), // Генерація ID для нової події
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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{eventToEdit ? "Edit Event" : "Add Event"}</h2>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
        <button type="button" onClick={handleSubmit}>
          {eventToEdit ? "Update Event" : "Add Event"}
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </Modal>
  );
};

export default EventModal;
