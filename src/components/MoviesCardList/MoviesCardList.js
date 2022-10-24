import MoviesCard from '../MoviesCard/MoviesCard';
import { cards } from '../../constants';
import './MoviesCardList.css';

function moviesCardList() {
  return (
    <ul className="moviesCardList">
      {cards.map((card) => (
        <MoviesCard
          key={card.id}
          card={card}
        />
      ))}
    </ul>
  );
}

export default moviesCardList;
