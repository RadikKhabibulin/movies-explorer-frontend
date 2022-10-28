import { useEffect, useState } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const movies = props.movies;
  const isCheckboxEnabled = props.isCheckboxEnabled;
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (movies.length !== 0) {
      return;
    }

    props.onHandleSearchClick();
  }, []);

  useEffect(() => {
    const newArray = movies.filter((movie) => {
      return filterMovies(movie, props.searchFilter, isCheckboxEnabled);
    });

    setFilteredMovies(newArray);
  }, [movies, isCheckboxEnabled]);

  function filterMovies(movie, filter, isShrot) {
    return (
      (movie.nameEN.toLowerCase().includes(filter.toLowerCase()) ||
      movie.nameRU.toLowerCase().includes(filter.toLowerCase())) &&
      (isShrot ? movie.duration <= 40 : true)
    );
  }

  return (
    <main className="movies">
      <SearchForm
        onHandleSearchClick={props.onHandleSearchClick}
        isCheckboxEnabled={props.isCheckboxEnabled}
        setIsCheckboxEnabled={props.setIsCheckboxEnabled}
        searchFilter={props.searchFilter}
        setSearchFilter={props.setSearchFilter}
      />
      { props.isPreloaderOpen ?
        <Preloader /> :
        (
          props.errors ?
          <p className="movies__error">
            Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз
          </p> :
          (
            filteredMovies.length === 0 ?
            <p className="movies__error">Ничего не найдено</p> :
            <>
              <MoviesCardList movies={filteredMovies}/>
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
