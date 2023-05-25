import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  return (
    <form className="search-form">
      <fieldset className="search-form__fieldset">
        <input
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        required
        />
        <button className="search-form__button" type="submit">Найти</button>
      </fieldset>
      <FilterCheckbox />
    </form>
  )
}

export default SearchForm;