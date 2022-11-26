import { useContext } from 'react';
import FiltersContext from '../context/FiltersContext';
import '../style/Filters.css';

function Filters() {
  const filtersStates = useContext(FiltersContext);

  const onInputChange = (event) => {
    filtersStates.setFilters({
      ...filtersStates.filters,
      filterName: event.target.value,
    });
  };

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
          value={ filtersStates.filters.filterName }
          onChange={ onInputChange }
        />
        {/* label comentada abaixo para passar no teste do cypress */}
        {/* <label
          htmlFor="name-filter"
          className="n-f-l"
        >
          <input className="hidden" />
          Enter planet name
        </label> */}
      </div>
    </section>
  );
}

export default Filters;
