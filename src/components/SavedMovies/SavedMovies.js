import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/savedMovies';

function SavedMovies() {

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={cards}/>
      <div className="saved-movies__divider"></div>
    </section>
  )
}

export default SavedMovies;