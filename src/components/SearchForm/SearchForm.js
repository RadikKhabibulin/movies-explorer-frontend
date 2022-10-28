import { useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm(props) {
  const [value, setValue] = useState(props.searchFilter);

  function handleToggleCheckbox() {
    props.setIsCheckboxEnabled(!props.isCheckboxEnabled);
  }

  function handleChange(e) {
    setValue(e.target.value);

    if (e.target.value === '') {
      setTimeout(() => {
        if (e.target.value === '' && props.searchFilter !== '') {
          props.setSearchFilter(e.target.value);
          props.onHandleSearchClick();
        }
      }, 1000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setSearchFilter(value);
    props.onHandleSearchClick();
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__image" />
          <input
            value={value}
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
            isCheckboxEnabled={props.isCheckboxEnabled}
            onHandleToggleCheckbox={handleToggleCheckbox}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
