import { useLocation } from "react-router-dom";
import { BeatfilmMoviesApiUrl } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({ card, onHandleMovieLike, onHandleDeleteMovie }) {
  const location = useLocation();

  const cardLikeButtonClassName = (
    `card__button ${card.isLiked ? 'card__button_type_like-active' : 'card__button_type_like'}`
  );
  const cardDurationHours = Math.floor(card.duration / 60);
  const cardDurationMinutes = card.duration - cardDurationHours * 60;

  function handleClick() {
    window.open(card.trailerLink);
  }

  function handleLikeClick() {
    onHandleMovieLike(card);
  }

  function handleDeleteClick() {
    onHandleDeleteMovie(card._id);
  }

  return (
    <li className="card">
      <img className="card__image"
        src={location.pathname === '/saved-movies' ? card.image : (BeatfilmMoviesApiUrl + card.image.url)}
        alt="Место"
        onClick={handleClick}/>
      <div className="card__body">
        <h2 className="card__title">{card.nameRU}</h2>
        {
          location.pathname === '/saved-movies' ?
          <button
            className="card__button card__button_type_delete"
            type="button"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          /> :
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
        }
      </div>
      <p className="card__duration">{cardDurationHours}ч {cardDurationMinutes}м</p>
    </li>
  );
}

export default MoviesCard;
