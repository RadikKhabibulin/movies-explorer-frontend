import './Input.css';

function Input({ properties }) {
  return (
    <div className="input">
      <label htmlFor={properties.id} className="input__label">{properties.label}
        <input
          className="input__field"
          type={properties.type}
          id={properties.id}
          name={properties.name}
          minLength={properties.minLength}
          maxLength={properties.maxLength}
          required={properties.required}
        />
      </label>
      <span className={`input__error ${properties.id}-error`}></span>
    </div>
  );
}

export default Input;
