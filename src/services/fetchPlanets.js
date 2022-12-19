const planetsDataFormat = (data) => {
  const localData = data;
  for (let index = 0; index < localData.results.length; index += 1) {
    delete localData.results[index].residents;
  }
  return localData;
};

const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const planetsData = await response.json();
  return planetsDataFormat(planetsData);
};

export default fetchPlanets;
