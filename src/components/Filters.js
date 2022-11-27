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
          autoComplete="off"
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
      <div className="number-filters-div">
        <select className="type-number-filter" data-testid="column-filter">
          <option>Population</option>
          <option>Orbital Period</option>
          <option>Diameter</option>
          <option>Rotation Period</option>
          <option>Surface Water</option>
        </select>
        <select className="comparison-number-filter" data-testid="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          className="value-number-filter"
          data-testid="value-filter"
        />
        <button
          data-testid="button-filter"
          className="button-number-filter"
          type="button"
        >
          Filter
        </button>
      </div>
    </section>
  );
}

export default Filters;
