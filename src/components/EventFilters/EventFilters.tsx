// src/components/EventFilters/EventFilters.tsx
import styles from "./EventFilters.module.css";

interface EventFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  endDate: string;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void;
}

const EventFilters = ({
  searchQuery,
  onSearchQueryChange,
  selectedCategory,
  onCategoryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onResetFilters,
}: EventFiltersProps) => {
  return (
    <div className={styles.eventFilters}>
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label>Search by Title:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={onSearchQueryChange}
            placeholder="Search events..."
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Filter by Category:</label>
          <select value={selectedCategory} onChange={onCategoryChange}>
            <option value="">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={onStartDateChange} />
        </div>
        <div className={styles.filterGroup}>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={onEndDateChange} />
        </div>
      </div>
      <div className={styles.resetButtonContainer}>
        <button className={styles.resetButton} onClick={onResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EventFilters;
