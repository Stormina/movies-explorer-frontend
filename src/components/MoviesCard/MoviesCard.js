import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ card }) {
  
  const location = useLocation();
  const [isBookmark, setBookmark] = useState(false);

  function handleBookmark() {
    setBookmark(!isBookmark);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{card.title}</h2>
          <p className="movies-card__duration">{card.duration}</p>
        </div>
        <div className="movies-card__bookmarks">
          { location.pathname === "/saved-movies" ? 
            <button type="button" className="movies-card__bookmark movies-card__bookmark_delete"/>
          :
            <button type="button"
              className={`movies-card__bookmark ${isBookmark ?
              "movies-card__bookmark_active" : ""}`}
              onClick={handleBookmark}
            />
          }
        </div>
      </div>
      <img className="movies-card__image" src={card.link} alt={card.title}></img>
    </li>
  )
}

export default MoviesCard;