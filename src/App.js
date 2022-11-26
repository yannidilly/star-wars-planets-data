import React, { useState } from 'react';
import PlanetsDataContext from './context/PlanetsDataContext';
import FiltersContext from './context/FiltersContext';
import initialFiltersStates from './context/FiltersStates';
import Header from './components/Header';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  const [planetsData, setPlanetsData] = useState({});
  const [filters, setFilters] = useState(initialFiltersStates);
  return (
    <PlanetsDataContext.Provider value={ { planetsData, setPlanetsData } }>
      <FiltersContext.Provider value={ { filters, setFilters } }>
        <Header />
        <Filters />
        <Table />
      </FiltersContext.Provider>
    </PlanetsDataContext.Provider>
  );
}

export default App;
