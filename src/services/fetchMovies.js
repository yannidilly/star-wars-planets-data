const fetchMovies = async () => {
  const response = await fetch('https://swapi.dev/api/films');
  const moviesData = await response.json();
  return moviesData;
};

export default fetchMovies;
