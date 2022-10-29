import { useEffect, useState } from 'react';

import { filterMovies } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (props.moviesLength !== 0) {
      return;
    }

    props.onHandleSearchClick();
  }, []);

  useEffect(() => {
    const newArray = props.savedMovies.filter((movie) => {
      return filterMovies(movie, props.searchFilter, props.isCheckboxEnabled);
    });

    setFilteredMovies(newArray);
  }, [props.savedMovies, props.isCheckboxEnabled, props.searchFilter]);

  return (
    <main className="movies">
      <SearchForm
        onHandleSearchClick={() => {}}
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
            filteredMovies.length === 0 ?
            <p className="movies__error">Ничего не найдено</p> :
            <MoviesCardList movies={filteredMovies} onHandleDeleteMovie={props.onHandleDeleteMovie}/>
          )
        )
      }
    </main>
  );
}

export default SavedMovies;
