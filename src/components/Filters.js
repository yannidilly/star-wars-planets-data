import '../style/Filters.css';

function Filters() {
  return (
    <section className="filters-section">
      <div
        className="n-f-d"
      >
        <input
          data-testid="name-filter"
          id="name-filter"
          type="text"
          className="n-f-i"
          placeholder=" "
        />
        <label
          htmlFor="name-filter"
          className="n-f-l"
        >
          <input className="hidden" />
          Enter planet name
        </label>
      </div>
    </section>
  );
}

export default Filters;
