function FilterCheckbox({ onChange, isShortMovies }) {

  return (
    <div className="filter">
      <input className="filter__checkbox" type="checkbox" id="checkbox"
        onChange={onChange} checked={isShortMovies} />
      <label for="checkbox" className="filter__label">
        <p className="filter__text">Короткометражки</p>
      </label>
    </div>
  )
}

export default FilterCheckbox;