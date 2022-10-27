import { useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm({ onHandleSearchClick}) {
  const [searchFilter, setSearchFilter] = useState(
    localStorage.getItem('searchFilter') ? localStorage.getItem('searchFilter') : ''
  );
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(
    localStorage.getItem('isCheckboxEnabled') === 'true' ? true : false
  );

  function handleToggleCheckbox() {
    setIsCheckboxEnabled(!isCheckboxEnabled);
  }

  function handleChange(e) {
    setSearchFilter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('searchFilter', searchFilter);
    localStorage.setItem('isCheckboxEnabled', isCheckboxEnabled);
    onHandleSearchClick();
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__image" />
          <input
            value={searchFilter}
            onChange={handleChange}
            type="text"
            className="search__input"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search__submit">Найти</button>
        </form>
        <div className="search__filter">
          <FilterCheckbox
            isCheckboxEnabled={isCheckboxEnabled}
            onHandleToggleCheckbox={handleToggleCheckbox}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
