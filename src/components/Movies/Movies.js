import { useEffect, useState } from 'react';

import {
  filterMovies,
  getColumnsCount,
  DEFAULT_INITIAL_ROW_COUNT,
  MOBILE_INITIAL_ROW_COUNT
} from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [firstRenderCount, setFirstRenderCount] = useState(0);
  const [countToBeAdded, setCountToBeAdded] = useState(0);
  const [searchFilter, setSearchFilter] = useState(
    localStorage.getItem('searchFilter') ? localStorage.getItem('searchFilter') : ''
  );
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(
    localStorage.getItem('isCheckboxEnabled') === 'true' ? true : false
  );

  useEffect(() => {
    if (props.movies.length !== 0) {
      return;
    }

    props.onDownloadMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('searchFilter', searchFilter);
    localStorage.setItem('isCheckboxEnabled', isCheckboxEnabled);

    const newArray = props.movies.filter((movie) => {
      return filterMovies(movie, searchFilter, isCheckboxEnabled);
    });

    setFilteredMovies(newArray);
  }, [props.movies, searchFilter, isCheckboxEnabled]);

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

    setCountToBeAdded(columnCount === 1 ? MOBILE_INITIAL_ROW_COUNT : columnCount);
    setFirstRenderCount(
      columnCount === 1 ? MOBILE_INITIAL_ROW_COUNT : columnCount * DEFAULT_INITIAL_ROW_COUNT
    );
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
        isCheckboxEnabled={isCheckboxEnabled}
        setIsCheckboxEnabled={setIsCheckboxEnabled}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
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
