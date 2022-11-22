import { useContext, useState, useEffect } from 'react';
import PlanetsDataContext from '../context/PlanetsDataContext';
import fetchPlanets from '../services/fetchPlanets';
import '../style/Table.css';

function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const planetsDataObj = useContext(PlanetsDataContext);

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

  useEffect(() => {
    fetchData();
    console.log(planetsDataObj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        (isLoading)
          ? <div className="table-loading" />
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
                    planetsDataObj.planetsData.results.map((planetInfo, index) => (
                      <tr key={ index }>
                        <td>{ planetInfo.name }</td>
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
