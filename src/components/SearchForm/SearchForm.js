import { useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';

function SearchForm(props) {
  const [value, setValue] = useState(props.searchFilter);
  const [error, setError] = useState('');

  function handleToggleCheckbox() {
    props.setIsCheckboxEnabled(!props.isCheckboxEnabled);
  }

  function handleChange(e) {
    setValue(e.target.value);
    setError('');

    if (e.target.value === '') {
      setTimeout(() => {
        if (e.target.value === '' && props.searchFilter !== '') {
          props.setSearchFilter(e.target.value);
        }
      }, 1000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {setError('')}, 2000);
      return;
    }

    props.setSearchFilter(value);
  }

  return (
    <section className="search">
      <span className="search__error">{error}</span>
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__image" />
          <input
            value={value}
            onChange={handleChange}
            type="text"
            className="search__input"
            placeholder="Фильм"
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
