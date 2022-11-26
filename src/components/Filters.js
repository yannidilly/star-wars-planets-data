import { useState } from 'react';
import '../style/Filters.css';

function Filters() {
  const [filterName, setFilterName] = useState('');

  const onInputChange = (event) => {
    setFilterName(event.target.value);
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
          value={ filterName }
          onChange={ onInputChange }
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
