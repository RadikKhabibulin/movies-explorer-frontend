import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__image" />
          <input type={"text"} className="search__input" placeholder="Фильм" />
          <button type="submit" className="search__submit">Найти</button>
        </form>
        <div className="search__filter">
          <FilterCheckbox />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
