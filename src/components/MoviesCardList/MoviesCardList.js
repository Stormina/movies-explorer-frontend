import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isLoading, notFoundMovies, saved, onMovieSave, onDeleteMovie }) {
  
  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
  }, []);

  const [isInitialMovies, setInitialMovies] = useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < 640) {
      return 5
    } else if(windowSize >= 640 && windowSize <= 997) {
      return 8
    } else if(windowSize > 997) {
      return 12 }
  } );
  const [moreFilms] = useState(() => {
    const windowSize = window.innerWidth;
     if(windowSize <= 997) {
      return 2
    } else if(windowSize > 997) {
      return 3
    }
  });

  function handleScreenWidth () {
    const windowSize = window.innerWidth;
    if(windowSize < 640) {
      setInitialMovies(5)
    } else if(windowSize <= 997) {
      setInitialMovies(8)
    } else if(windowSize > 997) {
      setInitialMovies(12)
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