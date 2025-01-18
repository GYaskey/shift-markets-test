interface EventFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  endDate: string;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFilters: () => void; // Додали функцію скидання
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
  onResetFilters, // Приймаємо функцію скидання
}: EventFiltersProps) => {
  return (
    <div>
      <div>
        <label>Search by Title:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder="Search events..."
        />
      </div>
      <div>
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={onCategoryChange}>
          <option value="">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={onStartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={onEndDateChange} />
      </div>
      {/* Кнопка скидання фільтрів */}
      <button onClick={onResetFilters}>Reset Filters</button>
    </div>
  );
};

export default EventFilters;
