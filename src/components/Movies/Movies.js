import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import LoadMoreSection from '../LoadMoreSection/LoadMoreSection';
import cards from '../../utils/movies';

function Movies() {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards}/>
      <LoadMoreSection />
    </section>
  )
}

export default Movies;