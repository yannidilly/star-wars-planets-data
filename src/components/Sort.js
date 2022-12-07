import React, { useState } from 'react';
import '../style/Sort.css';

function Sort() {
  const [sortType, setSortType] = useState('');
  const [sortCondition, setSortCondition] = useState('population');

  const onOrderButtonClick = () => {
    console.log(sortType);
    console.log(sortCondition);
  };

  return (
    <div
      className="sort-div"
    >
      <select
        data-testid="column-sort"
        className="type-number-sort"
        onChange={ (event) => setSortCondition(event.target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <div className="radio-div">
        <label
          htmlFor="SELECT"
          className="input-radio-sort"
          onChange={ (event) => setSortType(event.target.value) }
        >
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
            name="SELECT"
          />
          Ascendente
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
            name="SELECT"
          />
          Descendente
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        className="order-button"
        type="button"
        onClick={ onOrderButtonClick }
      >
        Order
      </button>
    </div>
  );
}

export default Sort;
