import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards }) {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {cards.map((card) => {
          return <MoviesCard key={card.id} card={card}/>
        })}
      </ul>
    </section>
  )
}

export default MoviesCardList;