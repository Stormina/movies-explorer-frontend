function FilterCheckbox({ onChange, isShortMovies }) {

  return (
    <div className="filter">
      <input className="filter__checkbox" type="checkbox" id="checkbox"
        onChange={onChange} checked={isShortMovies} />
      <p className="filter__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;