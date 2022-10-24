import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies() {
  const isPreloaderOpen = false;

  return (
    <main className="movies">
      <SearchForm />
      {isPreloaderOpen && <Preloader />}
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;
