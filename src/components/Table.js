import { useContext, useState, useEffect } from 'react';
import PlanetsDataContext from '../context/PlanetsDataContext';
import fetchPlanets from '../services/fetchPlanets';

function Table() {
  const [isLoading, setIsLoading] = useState(false);
  const planetsData = useContext(PlanetsDataContext);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchPlanetsData = await fetchPlanets();
      planetsData.setPlanetsData(fetchPlanetsData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {
        (isLoading)
          ? <p>Carregando...</p>
          : <h2>Tabela</h2>
      }
      <p>erro de lint</p>
    </>
  );
}

export default Table;
