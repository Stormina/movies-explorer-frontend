import { useState } from "react";

function MoviesCard({ movie, onMovieSave, onDeleteMovie, saved }) {
  const [isMoviesSaved, setIsMoviesSaved] = useState(false);

  const film = {
    country : movie.country || "Не найдено",
    director: movie.director || "Не найдено",
    duration: movie.duration || 0,
    year: movie.year || "Не найдено",
    description: movie.description || "Не найдено",
    image: `https://api.nomoreparties.co${movie.image?.url}`,
    trailerLink: movie?.trailerLink,
    nameRU: movie.nameRU || "Не найдено",
    nameEN: movie.nameEN || "Не найдено",
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
    movieId: movie.id,
  }

  const editedDuration = `${Math.trunc(film.duration/60)}ч ${film.duration % 60}м`;
  const image = `https://api.nomoreparties.co${movie.image?.url}`;
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  const currentMovie = savedMovies?.find((film) => film.nameRU === movie.nameRU);
  const isLiked = savedMovies
    ? savedMovies.some((item) => item.movieId === movie.id)
    : false;

  function handleLikeButtonCLick() {
    onMovieSave(film);
    onBookmarkState();
  }

  function handleDisLike() {
    onDeleteMovie(currentMovie._id);
    onBookmarkState();
  }

  function handleDeleteMovie() {
    onDeleteMovie(movie._id);
  }

  function onBookmarkState(){
    setIsMoviesSaved(!setIsMoviesSaved)
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">{editedDuration}</p>
        </div>
        <div className="movies-card__bookmarks">
          {saved ? 
            <button type="button" onClick={handleDeleteMovie}
              className={`movies-card__bookmark ${!isMoviesSaved ? "movies-card__bookmark_delete" : ""}`}/>
            :
            <button type="button"
              className={`movies-card__bookmark ${isLiked ?
              "movies-card__bookmark_active" : ""}`}
              onClick={isLiked ? handleDisLike : handleLikeButtonCLick}
            />
          }
        </div>
      </div>
      <a href={saved ? movie.trailerLink : movie.trailerLink}
        className="movies-card__trailer"
        rel="noreferrer"
        target="_blank">
          <img className="movies-card__image" src={saved ? movie.image : image} alt={movie.nameRU}></img>
      </a>
    </li>
  )
}

export default MoviesCard;