import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  movies,
  notFoundMovies,
  setNotFoundMovies,
  isLoading,
  setIsLoading,
  onSearchSavedMovies,
  onDeleteMovie,
}) {
  const [isShortMovies, setShortMovies] = useState(false);
  const [isMovies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const saved = true

useEffect(() => {
  setMovies(movies)
  setNotFoundMovies(notFoundMovies)
  setIsLoading(isLoading)
}, [isLoading, movies, notFoundMovies, setNotFoundMovies, setIsLoading])

  function handleSearch(searchWord) {
    setSearchWord(searchWord);
  }

  const handleSearchCheck = (films, target, searchWord) => {
    const filterRegex = new RegExp(searchWord, 'gi');
    return films.filter((film) => {
      if (target) {
        return film.duration <= 40 && filterRegex.test(film.nameRU)
      } else {
        return filterRegex.test(film.nameRU)
      }
    })
  }

  function handleShortMovies(event) {
    const target = event.target.checked
    if (target){
      const allMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const searchSavedResult = handleSearchCheck(allMovies, target, searchWord);
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
      setShortMovies(false);
    }}

  return (
    <section className="saved-movies">
      <SearchForm
        onSearchSavedMovies={onSearchSavedMovies}
        saved={saved}
        onShortMovies={handleShortMovies}
        isShortMovies={isShortMovies}
        onSearch={handleSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={isMovies}
        onDeleteMovie={onDeleteMovie}
        notFoundMovies={notFoundMovies}
        isLoading={isLoading}
      />
    </section>
  )
}

export default SavedMovies;