import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function moviesCardList({movies}) {
  return (
    <ul className="moviesCardList">
      {movies.map((card) => (
        <MoviesCard
          key={card.id}
          card={card}
        />
      ))}
    </ul>
  );
}

export default moviesCardList;
