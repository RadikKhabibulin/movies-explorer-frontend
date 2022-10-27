import './Input.css';

function Input({ properties, value, errors, onHandleChange }) {
  return (
    <div className="input">
      <label htmlFor={properties.id} className="input__label">{properties.label}
        <input
          className={`input__field ${errors && 'input__field_invalid'}`}
          type={properties.type}
          id={properties.id}
          name={properties.name}
          minLength={properties.minLength}
          maxLength={properties.maxLength}
          required={properties.required}
          onChange={onHandleChange}
          value={value ? value : ""}
        />
      </label>
      <span className={`input__error ${properties.id}-error`}>{errors}</span>
    </div>
  );
}

export default Input;
