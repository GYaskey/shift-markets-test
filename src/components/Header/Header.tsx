interface HeaderProps {
  openModalForNewEvent: () => void;
}

const Header = ({ openModalForNewEvent }: HeaderProps) => {
  return (
    <header>
      <h1>Event Scheduler</h1>
      <button onClick={openModalForNewEvent}>Add Event</button>
    </header>
  );
};

export default Header;
