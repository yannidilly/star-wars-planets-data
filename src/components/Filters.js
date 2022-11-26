import '../style/Filters.css';

function Filters() {
  return (
    <section className="filters-section">
      <div
        className="name-filter-div"
      >
        <input
          data-testid="name-filter"
          id="name-filter"
          type="text"
          className="name-filter-input"
          placeholder=" "
        />
        <label
          htmlFor="name-filter"
          className="name-filter-label"
        >
          <input className="hidden" />
          Enter planet name
        </label>
      </div>
    </section>
  );
}

export default Filters;
