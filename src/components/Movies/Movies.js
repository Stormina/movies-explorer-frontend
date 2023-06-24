import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function Movies({
  movies,
  notFoundMovies,
  setNotFoundMovies,
  isLoading,
  setIsLoading,
  onSearchMovies,
  onMovieSave,
  onDeleteMovie,
}) {
  const [isShortMovies, setShortMovies] = useState(false);
  const [isMovies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const saved = false

  useEffect(() => {
    if (localStorage.getItem('checkbox')) {
      setMovies(JSON.parse(localStorage.getItem('checkbox')));
      setShortMovies(true);
    } else {
      setMovies(movies);
      setNotFoundMovies(notFoundMovies);
      setIsLoading(isLoading);
    }
  }, [isLoading, movies, notFoundMovies, setNotFoundMovies, setIsLoading])

  function handleSearch(searchWord) {
    setSearchWord(searchWord);
  }

  const handleSearchCheck = (films, target, searchWord) => {
    const filterRegex = new RegExp(searchWord, 'gi');
    if (films) {
      return films.filter((film) => {
        if (target) {
          return film.duration <= SHORT_MOVIE_DURATION && filterRegex.test(film.nameRU)
        } else {
          return filterRegex.test(film.nameRU)
        }
      })
    } else {
      return [];
    }
  }

  function handleShortMovies(event) {
    const target = event.target.checked
    if (target){
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const searchSavedResult = handleSearchCheck(allMovies, target, searchWord);
      localStorage.setItem('checkbox', JSON.stringify(searchSavedResult));
      setShortMovies(true);
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult)
        setNotFoundMovies(false);
      }
    } else {
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const searchSavedResult = handleSearchCheck(allMovies, target, searchWord);
      setShortMovies(false);
      localStorage.removeItem('checkbox');
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult)
        setNotFoundMovies(false);
      }
    }}

  return (
    <section className="movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onShortMovies={handleShortMovies}
        isShortMovies={isShortMovies}
        saved={saved}
        onSearch={handleSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={isMovies}
        onMovieSave={onMovieSave}
        onDeleteMovie={onDeleteMovie}
        notFoundMovies={notFoundMovies}
        isLoading={isLoading}
      />
    </section>
  )
}

export default Movies;