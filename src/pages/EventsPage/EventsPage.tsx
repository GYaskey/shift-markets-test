import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "../../redux/selectors/eventsSelectors"; // Для доступу до подій
import EventList from "../../components/EventList/EventList";
import EventModal from "../../components/EventModal/EventModal";
import Header from "../../components/Header/Header";
import EventFilters from "../../components/EventFilters/EventFilters"; // Додаємо компонент фільтрів
import { Event } from "../../types/Event"; // Імпортуємо тип Event

const EventsPage = () => {
  const events = useSelector(selectEvents); // Вибираємо всі події з Redux

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<string | null>(null); // Для редагування події
  const [searchQuery, setSearchQuery] = useState(""); // Для пошуку за назвою
  const [selectedCategory, setSelectedCategory] = useState(""); // Для фільтру за категорією
  const [startDate, setStartDate] = useState(""); // Для фільтру за початковою датою
  const [endDate, setEndDate] = useState(""); // Для фільтру за кінцевою датою

  const openModalForNewEvent = () => {
    setEventToEdit(null); // Для нової події
    setIsModalOpen(true);
  };

  const openModalForEditingEvent = (eventId: string) => {
    setEventToEdit(eventId); // Для редагування події
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Фільтруємо події на основі пошуку, категорії та діапазону дат
  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()); // Пошук за назвою
    const matchesCategory =
      !selectedCategory || event.category === selectedCategory; // Фільтр за категорією
    const matchesDateRange =
      (!startDate || new Date(event.date) >= new Date(startDate)) &&
      (!endDate || new Date(event.date) <= new Date(endDate)); // Фільтр за датами
    return matchesSearch && matchesCategory && matchesDateRange;
  });

  // Функція для скидання фільтрів
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <Header openModalForNewEvent={openModalForNewEvent} />
      <EventFilters
        searchQuery={searchQuery}
        onSearchQueryChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо пошук
        selectedCategory={selectedCategory}
        onCategoryChange={(e) => setSelectedCategory(e.target.value)} // Оновлюємо категорію
        startDate={startDate}
        onStartDateChange={(e) => setStartDate(e.target.value)} // Оновлюємо початкову дату
        endDate={endDate}
        onEndDateChange={(e) => setEndDate(e.target.value)} // Оновлюємо кінцеву дату
      />
      <button onClick={resetFilters}>Reset Filters</button>{" "}
      {/* Кнопка для скидання фільтрів */}
      <EventList
        events={filteredEvents} // Передаємо фільтровані події
        openModalForEditingEvent={openModalForEditingEvent} // Функція для редагування
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        eventToEdit={eventToEdit} // Передаємо id події для редагування
      />
    </div>
  );
};

export default EventsPage;
