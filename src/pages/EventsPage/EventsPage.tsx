import { useState } from "react";
import EventList from "../../components/EventList/EventList";
import EventModal from "../../components/EventModal/EventModal";
import Header from "../../components/Header/Header";

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<string | null>(null); // Змінюємо на id події

  const openModalForNewEvent = () => {
    setEventToEdit(null); // Для нової події
    setIsModalOpen(true);
  };

  const openModalForEditingEvent = (eventId: string) => {
    setEventToEdit(eventId); // Для редагування події за id
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header openModalForNewEvent={openModalForNewEvent} />
      <EventList openModalForEditingEvent={openModalForEditingEvent} />
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        eventToEdit={eventToEdit} // Передаємо id події
      />
    </div>
  );
};

export default EventsPage;
