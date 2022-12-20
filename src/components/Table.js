/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import { useContext, useState, useEffect } from 'react';
import FiltersContext from '../context/FiltersContext';
import PlanetsDataContext from '../context/PlanetsDataContext';
import OrderContext from '../context/OrderContext';
import fetchPlanets from '../services/fetchPlanets';
import fetchMovies from '../services/fetchMovies';
import '../style/Table.css';

function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const planetsDataObj = useContext(PlanetsDataContext);
  const { filters: { filterName, filtersNumber } } = useContext(FiltersContext);
  const orderContext = useContext(OrderContext);

  const [isFilmsLoading, setIsFilmsLoading] = useState(true);
  const [fetchFilmsError, setFetchFilmsError] = useState(false);
  const [filmsData, setFilmsData] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchPlanetsData = await fetchPlanets();
      planetsDataObj.setPlanetsData(fetchPlanetsData);
    } catch (error) {
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilms = async () => {
    try {
      const fetchFilmsData = await fetchMovies();
      setFilmsData(fetchFilmsData);
    } catch (error) {
      setFetchFilmsError(error);
    } finally {
      setIsFilmsLoading(false);
    }
  };

  const filterPlanets = () => {
    const planetsNameFilter = planetsDataObj.planetsData.results
      .filter((planetInfo) => planetInfo.name.toLowerCase()
        .includes(filterName.toLowerCase()));
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
        return planetInfo[filtersNumber[index].type] === filtersNumber[index]
          .valueNumber;
      });
    }
    return planetsNumberFilter;
  };

  const orderOnClick = (name) => {
    if (orderContext.order.sort === 'DESC' && orderContext.order.column === name) {
      orderContext.setOrder({
        column: name,
        sort: 'ASC',
      });
    } else {
      orderContext.setOrder({
        column: name,
        sort: 'DESC',
      });
    }
  };

  const orderPlanets = () => {
    const filteredPlanetsData = filterPlanets();
    const orderType = orderContext.order.column;
    const orderCondition = orderContext.order.sort;
    let orderPlanetsData = filteredPlanetsData;

    if (orderCondition === 'ASC') {
      orderPlanetsData = filteredPlanetsData
        .sort((next, b) => parseInt(next[orderType], 10) - parseInt(b[orderType], 10));
      const unknownValuePlanets = orderPlanetsData
        .filter((planet) => planet[orderType] === 'unknown');
      const unknownValuePosition = unknownValuePlanets
        .map((planet) => orderPlanetsData.indexOf(planet));
      for (let index = 0; index < unknownValuePosition.length; index += 1) {
        const unknownPlanetData = orderPlanetsData[unknownValuePosition[0]];
        orderPlanetsData.splice(unknownValuePosition[0], 1);
        orderPlanetsData.push(unknownPlanetData);
      }
    } else {
      orderPlanetsData = filteredPlanetsData
        .sort((a, b) => parseInt(b[orderType], 10) - parseInt(a[orderType], 10));
    }
    return orderPlanetsData;
  };

  useEffect(() => {
    fetchData();
    fetchFilms();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      orderPlanets();
    }
  }, [orderContext.order]);

  if (fetchError || fetchFilmsError) {
    return <h3>Could not load table</h3>;
  }

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
                    <th>
                      <button type="button" className="cell-button">Name</button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                        onClick={ () => orderOnClick('rotation_period') }
                      >
                        Rotation Period
                      </button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                        onClick={ () => orderOnClick('orbital_period') }
                      >
                        Orbital Period
                      </button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                        onClick={ () => orderOnClick('diameter') }
                      >
                        Diameter
                      </button>
                    </th>
                    <th>
                      <button type="button" className="cell-button">
                        Climate
                      </button>
                    </th>
                    <th>
                      <button type="button" className="cell-button">
                        Gravity
                      </button>
                    </th>
                    <th>
                      <button type="button" className="cell-button">
                        Terrain
                      </button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                        onClick={ () => orderOnClick('surface_water') }
                      >
                        Surface Water
                      </button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                        onClick={ () => orderOnClick('population') }
                      >
                        Population
                      </button>
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cell-button"
                      >
                        Films
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderPlanets().map((planetInfo, index) => (
                      <tr key={ index }>
                        <td data-testid="planet-name">{ planetInfo.name }</td>
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
                            (isFilmsLoading) ? <div className="film-loading" />
                              : (
                                planetInfo.films.map((filmLink, filmIndex) => (
                                  <p className="film-link" key={ filmIndex }>
                                    {
                                      filmsData.results.find((filmData) => filmData
                                        .url === filmLink).title
                                    }
                                  </p>
                                ))
                              )
                          }
                        </td>
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
