import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { useState } from 'react';

function Movies({isPreloaderOpen, movies, onHandleSearchClick, errors}) {
  const [moviesCount, setMoviesCount] = useState(movies.length);

  return (
    <main className="movies">
      <SearchForm
        onHandleSearchClick={onHandleSearchClick}
      />
      { isPreloaderOpen ?
        <Preloader /> :
        (
          errors ?
          <p className="movies__error">
            Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз
          </p> :
          (
            movies.length === 0 ?
            <p className="movies__error">Ничего не найдено</p> :
            <>
              <MoviesCardList movies={movies}/>
              <section className="more">
                <button className="more__button">Ещё</button>
              </section>
            </>
          )
        )
      }
    </main>
  );
}

export default Movies;
