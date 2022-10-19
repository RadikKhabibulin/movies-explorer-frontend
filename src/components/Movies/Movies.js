import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies() {
  const isPreloaderOpen = false;

  return (
    <main className="movies">
      <SearchForm />
      {isPreloaderOpen && <Preloader />}
    </main>
  );
}

export default Movies;
