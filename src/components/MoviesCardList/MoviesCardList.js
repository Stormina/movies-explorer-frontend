import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { WINDOW_SIZE, INITIAL_CARDS, ADDING_CARDS } from '../../utils/constants';

function MoviesCardList({ movies, isLoading, notFoundMovies, saved, onMovieSave, onDeleteMovie }) {
  
  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
  }, []);

  const [isInitialMovies, setInitialMovies] = useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < WINDOW_SIZE.SMALL) {
      return INITIAL_CARDS.MIN
    } else if(windowSize >= WINDOW_SIZE.SMALL && windowSize <= WINDOW_SIZE.LARGE) {
      return INITIAL_CARDS.MID
    } else if(windowSize > WINDOW_SIZE.LARGE) {
      return INITIAL_CARDS.MAX
    }
  });

  const [moreFilms] = useState(() => {
    const windowSize = window.innerWidth;
     if(windowSize <= WINDOW_SIZE.LARGE) {
      return ADDING_CARDS.MIN
    } else if(windowSize > WINDOW_SIZE.LARGE) {
      return ADDING_CARDS.MAX
    }
  });

  function handleScreenWidth () {
    const windowSize = window.innerWidth;
    if(windowSize < WINDOW_SIZE.SMALL) {
      setInitialMovies(INITIAL_CARDS.MIN)
    } else if(windowSize <= WINDOW_SIZE.LARGE) {
      setInitialMovies(INITIAL_CARDS.MID)
    } else if(windowSize > WINDOW_SIZE.LARGE) {
      setInitialMovies(INITIAL_CARDS.MAX)
    }
  }

  const showMovies = movies?.slice(0, isInitialMovies);

  function handleMoviesIncrease() {
    setInitialMovies(state => {return state + moreFilms});
  }

  return (
    <section className="movies-cards">
      {isLoading && <Preloader />}
      {notFoundMovies && <span className="movies-cards__error">Ничего не найдено</span>}

      <ul className="movies-cards__list">
        {showMovies?.map((movie) => (
          <MoviesCard 
            key={saved ? movie._id : movie.id}
            movie={movie}
            saved={saved}
            onMovieSave={onMovieSave}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </ul>
      <div className="movies-cards__loader">
        <button type="button"
          onClick={handleMoviesIncrease}
          className={`movies-cards__loader-button ${movies?.length === showMovies?.length ? "movies-cards__loader-button_hidden" : ""}`}>
            Ещё
        </button>
    </div>
    </section>
  )
}

export default MoviesCardList;