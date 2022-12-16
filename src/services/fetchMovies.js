const fetchMovies = async (url) => {
  const response = await fetch(url);
  const moviesData = await response.json();
  return moviesData;
};

export default fetchMovies;
