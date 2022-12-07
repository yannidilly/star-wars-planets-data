import React, { useState } from 'react';
import PlanetsDataContext from './context/PlanetsDataContext';
import FiltersContext from './context/FiltersContext';
import OrderContext from './context/OrderContext';
import initialFiltersStates from './context/FiltersStates';
import initialOrderStates from './context/OrderStates';
import Header from './components/Header';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  const [planetsData, setPlanetsData] = useState({});
  const [filters, setFilters] = useState(initialFiltersStates);
  const [order, setOrder] = useState(initialOrderStates);
  return (
    <PlanetsDataContext.Provider value={ { planetsData, setPlanetsData } }>
      <FiltersContext.Provider value={ { filters, setFilters } }>
        <OrderContext.Provider value={ { order, setOrder } }>
          <Header />
          <Filters />
          <Table />
        </OrderContext.Provider>
      </FiltersContext.Provider>
    </PlanetsDataContext.Provider>
  );
}

export default App;
