const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const planetsData = await response.json();
  return planetsData;
};

export default fetchPlanets;
