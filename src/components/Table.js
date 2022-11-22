import { useContext, useState, useEffect } from 'react';
import PlanetsDataContext from '../context/PlanetsDataContext';
import fetchPlanets from '../services/fetchPlanets';
import '../style/Table.css';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        (isLoading)
          ? <div className="table-loading" />
          : <h2>Tabela</h2>
      }
    </div>
  );
}

export default Table;
