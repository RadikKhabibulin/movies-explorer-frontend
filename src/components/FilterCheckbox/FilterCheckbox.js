import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label htmlFor="short-movies" className="filter-checkbox__checkbox-label">
      <input type={"checkbox"} className="filter-checkbox__invisible-checkbox" id="short-movies"/>
      <div className="filter-checkbox__visible-checkbox">
        <div className="filter-checkbox__visible-checkbox-trigger" />
      </div>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
