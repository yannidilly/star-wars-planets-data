import React, {useState} from 'react';
import PlanetsDataContext from './context/PlanetsDataContext';
import Header from './components/Header';
import Table from './components/Table';

function App() {
  const [planetsData, setPlanetsData] = useState({});
  return (
    <PlanetsDataContext.Provider value={ { planetsData, setPlanetsData } }>
      <Header />
      <Table />
    </PlanetsDataContext.Provider>
  );
}

export default App;
