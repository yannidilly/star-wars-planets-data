import { useContext, useState } from 'react';
import FiltersContext from '../context/FiltersContext';
import '../style/Filters.css';

function Filters() {
  const [actualFilterNumber, setActualFilterNumber] = useState({
    type: 'population',
    comparisonNumber: 'maior que',
    valueNumber: 0,
  });
  const filtersStates = useContext(FiltersContext);

  const onInputChange = (event) => {
    if (event.target.name === 'nameFilter') {
      filtersStates.setFilters({
        ...filtersStates.filters,
        filterName: event.target.value,
      });
    }
    if (event.target.name === 'valueNumber') {
      setActualFilterNumber({
        ...actualFilterNumber,
        valueNumber: event.target.value,
      });
    }
  };

  const onSelectChange = (event) => {
    setActualFilterNumber({
      ...actualFilterNumber,
      [event.target.name]: event.target.value,
    });
  };

  const addNumberFilterOnGlobalState = () => {
    filtersStates.setFilters({
      ...filtersStates.filters,
      filtersNumber: [
        ...filtersStates.filters.filtersNumber,
        actualFilterNumber,
      ],
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
          name="nameFilter"
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
        <select
          data-testid="column-filter"
          className="type-number-filter"
          name="type"
          onChange={ onSelectChange }
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
        <select
          data-testid="comparison-filter"
          className="comparison-number-filter"
          name="comparisonNumber"
          onChange={ onSelectChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          className="value-number-filter"
          name="valueNumber"
          onChange={ onInputChange }
        />
        <button
          data-testid="button-filter"
          className="button-number-filter"
          type="button"
          onClick={ addNumberFilterOnGlobalState }
        >
          Filter
        </button>
      </div>
    </section>
  );
}

export default Filters;
