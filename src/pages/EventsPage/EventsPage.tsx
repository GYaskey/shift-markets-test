import { useState } from "react";
import EventList from "../../components/EventList/EventList";
import EventModal from "../../components/EventModal/EventModal";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { selectEvents } from "../../redux/selectors/eventsSelectors";
import EventFilters from "../../components/EventFilters/EventFilters";
import styles from "./EventsPage.module.css";

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");

  const events = useSelector(selectEvents);

  const filteredEvents = events
    .filter((event) => {
      return (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!startDate || new Date(event.date) >= new Date(startDate)) &&
        (!endDate || new Date(event.date) <= new Date(endDate)) &&
        (!category ||
          event.category.toLowerCase().includes(category.toLowerCase()))
      );
    })
    .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  const openModalForNewEvent = () => {
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEditingEvent = (eventId: string) => {
    setEventToEdit(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };

  return (
    <>
      <Header openModalForNewEvent={openModalForNewEvent} />
      <div className={styles.pageContainer}>
        <EventFilters
          searchQuery={searchQuery}
          onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
          selectedCategory={category}
          onCategoryChange={(e) => setCategory(e.target.value)}
          startDate={startDate || ""}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          endDate={endDate || ""}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onResetFilters={resetFilters}
        />
        <EventList
          openModalForEditingEvent={openModalForEditingEvent}
          events={filteredEvents}
        />
        <Pagination
          totalEvents={events.length}
          eventsPerPage={eventsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          eventToEdit={eventToEdit}
        />
      </div>
    </>
  );
};

export default EventsPage;
