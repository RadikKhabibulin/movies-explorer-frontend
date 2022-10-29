import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function moviesCardList({ movies, onHandleMovieLike, onHandleDeleteMovie }) {
  return (
    <ul className="moviesCardList">
      {movies.map((card) => (
        <MoviesCard
          key={card.id}
          card={card}
          onHandleMovieLike={onHandleMovieLike}
          onHandleDeleteMovie={onHandleDeleteMovie}
        />
      ))}
    </ul>
  );
}

export default moviesCardList;
