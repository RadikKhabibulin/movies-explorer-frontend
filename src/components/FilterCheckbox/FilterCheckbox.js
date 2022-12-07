import './FilterCheckbox.css';

function FilterCheckbox({isCheckboxEnabled, onHandleToggleCheckbox}) {
  return (
    <label htmlFor="short-movies" className="filter">
      <input
        type={"checkbox"}
        className={`filter__invisible-checkbox`}
        id="short-movies"
        onClick={onHandleToggleCheckbox}
        checked={isCheckboxEnabled}
      />
      <div className="filter__visible-checkbox">
        <div className="filter__visible-checkbox-trigger" />
      </div>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
