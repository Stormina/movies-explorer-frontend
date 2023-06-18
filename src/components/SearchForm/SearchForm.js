import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  onSearch,
  onSearchMovies,
  onSearchSavedMovies,
  onShortMovies,
  isShortMovies,
  saved
}) {
  const [search, setSearch] = useState('')

  function handleChange(event){
    setSearch(event.target.value);
    onSearch(event.target.value);
  }

  function handleSearchMovies(event) {
    event.preventDefault();
    onSearchMovies(search);
  }

  function handleSearchSavedMovies(event) {
    event.preventDefault();
    onSearchSavedMovies(search);
  }

  return (
    <form onSubmit={saved ? handleSearchSavedMovies : handleSearchMovies}
      className="search-form auth__form">
        <fieldset className="search-form__fieldset">
          <input
            name="search"
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
            value={search ? search : ""}
            onChange={handleChange}
          />
          <button className="search-form__button" type="submit">Найти</button>
        </fieldset>
        <FilterCheckbox onChange={onShortMovies} isShortMovies={isShortMovies}/>
    </form>
  )
}

export default SearchForm;