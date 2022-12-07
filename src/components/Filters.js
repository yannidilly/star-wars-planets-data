import { useContext, useState } from 'react';
import FiltersContext from '../context/FiltersContext';
import Sort from './Sort';
import '../style/Filters.css';
import Trash from '../icons/trash.svg';

function Filters() {
  const [actualFilterNumber, setActualFilterNumber] = useState({
    type: 'population',
    comparisonNumber: 'maior que',
    valueNumber: 0,
  });
  const filtersStates = useContext(FiltersContext);
  const allTypeFilterNumbersOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const availableFilters = () => {
    const usedFilters = filtersStates.filters.filtersNumber;
    const usedFiltersTypes = usedFilters.map((filter) => filter.type);
    let unusedFilters = allTypeFilterNumbersOptions;
    usedFilters.forEach((usedFilter, index) => {
      unusedFilters = unusedFilters.filter((type) => type !== usedFiltersTypes[index]);
    });
    return unusedFilters;
  };

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
    if (availableFilters()[0] !== undefined) {
      filtersStates.setFilters({
        ...filtersStates.filters,
        filtersNumber: [
          ...filtersStates.filters.filtersNumber,
          actualFilterNumber,
        ],
      });
      setActualFilterNumber({
        type: availableFilters()[1],
        comparisonNumber: 'maior que',
        valueNumber: '0',
      });
    }
  };

  const removeFilter = (type) => {
    const usedFilters = filtersStates.filters.filtersNumber;
    usedFilters.splice(usedFilters.map((filter) => filter.type).indexOf(type), 1);
    filtersStates.setFilters({
      ...filtersStates.filters,
      filtersNumber: usedFilters,
    });
  };

  const resetFilters = () => {
    filtersStates.setFilters({
      ...filtersStates.filters,
      filtersNumber: [],
    });
  };

  return (
    <section className="filters-section">
      <div className="create-filters-div">
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
        <Sort />
        <div className="number-filters-div">
          <select
            data-testid="column-filter"
            className="type-number-filter"
            name="type"
            value={ actualFilterNumber.type }
            onChange={ onSelectChange }
          >
            {
              availableFilters().map((typeFilter, index) => (
                <option key={ index } value={ typeFilter }>{ typeFilter }</option>
              ))
            }
          </select>
          <select
            data-testid="comparison-filter"
            className="comparison-number-filter"
            name="comparisonNumber"
            value={ actualFilterNumber.comparisonNumber }
            onChange={ onSelectChange }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            data-testid="value-filter"
            className="value-number-filter"
            type="number"
            name="valueNumber"
            value={ actualFilterNumber.valueNumber }
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
          <button
            data-testid="button-remove-filters"
            className="button-clean-number-filters"
            type="button"
            onClick={ resetFilters }
          >
            Clean all filters
          </button>
        </div>
      </div>
      <div className="active-filters">
        {
          filtersStates.filters.filtersNumber.map((filter, index) => (
            <div className="filter" data-testid="filter" key={ index }>
              <p className="filter-description">{filter.type}</p>
              <p className="filter-description">{filter.comparisonNumber}</p>
              <p className="filter-description">{ filter.valueNumber }</p>
              <button
                className="delete-button"
                type="button"
                onClick={ () => removeFilter(filter.type) }
              >
                <img className="delete-icon" src={ Trash } alt="delete button" />
              </button>
            </div>
          ))
        }
      </div>
    </section>
  );
}

export default Filters;
