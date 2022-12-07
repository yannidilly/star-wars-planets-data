import { useContext, useState, useEffect } from 'react';
import FiltersContext from '../context/FiltersContext';
import PlanetsDataContext from '../context/PlanetsDataContext';
import fetchPlanets from '../services/fetchPlanets';
import '../style/Table.css';

function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const planetsDataObj = useContext(PlanetsDataContext);
  const { filters: { filterName, filtersNumber } } = useContext(FiltersContext);

  const planetsDataFormat = (data) => {
    const localData = data;
    for (let index = 0; index < localData.results.length; index += 1) {
      delete localData.results[index].residents;
    }
    return localData;
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchPlanetsData = await fetchPlanets();
      planetsDataObj.setPlanetsData(planetsDataFormat(fetchPlanetsData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPlanets = () => {
    const planetsNameFilter = planetsDataObj.planetsData.results
      .filter((planetInfo) => planetInfo.name.includes(filterName));
    let planetsNumberFilter = planetsNameFilter;
    for (let index = 0; index < filtersNumber.length; index += 1) {
      planetsNumberFilter = planetsNumberFilter.filter((planetInfo) => {
        if (filtersNumber[index].comparisonNumber === 'maior que') {
          return planetInfo[filtersNumber[index].type] > JSON.parse(filtersNumber[index]
            .valueNumber);
        }
        if (filtersNumber[index].comparisonNumber === 'menor que') {
          return planetInfo[filtersNumber[index].type] < JSON.parse(filtersNumber[index]
            .valueNumber);
        }
        if (filtersNumber[index].comparisonNumber === 'igual a') {
          return planetInfo[filtersNumber[index].type] === filtersNumber[index]
            .valueNumber;
        }
        return null;
      });
    }
    return planetsNumberFilter;
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        (isLoading)
          ? <div className="table-loading" data-testid="loading" />
          : (
            <section className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rotation Period</th>
                    <th>Orbital Period</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Gravity</th>
                    <th>Terrain</th>
                    <th>Surface Water</th>
                    <th>Population</th>
                    <th>Films</th>
                    <th>Created</th>
                    <th>Edited</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterPlanets().map((planetInfo, index) => (
                      <tr key={ index }>
                        <td data-testid={ planetInfo.name }>{ planetInfo.name }</td>
                        <td>{ planetInfo.rotation_period }</td>
                        <td>{ planetInfo.orbital_period }</td>
                        <td>{ planetInfo.diameter }</td>
                        <td>{ planetInfo.climate }</td>
                        <td>{ planetInfo.gravity }</td>
                        <td>{ planetInfo.terrain }</td>
                        <td>{ planetInfo.surface_water }</td>
                        <td>{ planetInfo.population }</td>
                        <td>
                          {
                            planetInfo.films.map((film, filmIndex) => (
                              <p className="film-link" key={ filmIndex }>{ film }</p>
                            ))
                          }
                        </td>
                        <td className="film-created">{ planetInfo.created }</td>
                        <td className="film-edited">{ planetInfo.edited }</td>
                        <td className="planet-url">{ planetInfo.url }</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </section>
          )
      }
    </div>
  );
}

export default Table;
