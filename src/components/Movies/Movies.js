import { useEffect, useState } from 'react';

import { filterMovies, getColumnsCount } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [firstRenderCount, setFirstRenderCount] = useState(0);
  const [countToBeAdded, setCountToBeAdded] = useState(0);

  useEffect(() => {
    if (props.movies.length !== 0) {
      return;
    }

    props.onHandleSearchClick();
  }, []);

  useEffect(() => {
    const newArray = props.movies.filter((movie) => {
      return filterMovies(movie, props.searchFilter, props.isCheckboxEnabled);
    });

    setFilteredMovies(newArray);
  }, [props.movies, props.isCheckboxEnabled]);

  useEffect(() => {
    handleResize();

    let resizeTimeout;
    window.onresize = (() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    });
  }, []);

  useEffect(() => {
    if (visibleMovies.length > firstRenderCount) {
      setVisibleMovies(filteredMovies.slice(0, visibleMovies.length));
    }
    else {
      setVisibleMovies(filteredMovies.slice(0, firstRenderCount));
    }

  }, [firstRenderCount, filteredMovies]);

  function handleResize() {
    const columnCount = getColumnsCount();

    setCountToBeAdded(columnCount === 1 ? 5 : columnCount);
    setFirstRenderCount(columnCount === 1 ? 5 : columnCount * 3);
  }

  function handleMoreClick() {
    const remainder = visibleMovies.length % countToBeAdded;

    if (remainder) {
      setVisibleMovies(
        filteredMovies.slice(0, (visibleMovies.length + (countToBeAdded * 2  - remainder)))
      );
    }
    else {
      setVisibleMovies(
        filteredMovies.slice(0, (visibleMovies.length + countToBeAdded))
      );
    }
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
            Подождите немного и попробуйте ещё раз.
          </p> :
          (
            visibleMovies.length === 0 ?
            <p className="movies__error">Ничего не найдено</p> :
            <>
              <MoviesCardList movies={visibleMovies} onHandleMovieLike={props.onHandleMovieLike}/>
              <section className={`more ${filteredMovies.length > visibleMovies.length ? '' : 'more_hidden'}`}>
                <button className="more__button" onClick={handleMoreClick}>Ещё</button>
              </section>
            </>
          )
        )
      }
    </main>
  );
}

export default Movies;
