import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies() {
  const isPreloaderOpen = false;

  return (
    <main className="movies">
      <SearchForm />
      {isPreloaderOpen && <Preloader />}
      <MoviesCardList />
      <section className="more">
        <button className="more__button">Ещё</button>
      </section>
    </main>
  );
}

export default Movies;
