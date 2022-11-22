import { useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';

function Table() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const planetsData = await fetchPlanets();
      console.log(planetsData);
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
