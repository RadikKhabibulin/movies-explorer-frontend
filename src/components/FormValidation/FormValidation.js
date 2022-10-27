import { useCallback, useState } from "react";
import * as EmailValidator from 'email-validator';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValid(target.closest("form").checkValidity());

    if (name === 'profile-email' && target.validationMessage === '') {
      if (!EmailValidator.validate(value)) {
        const err = 'Введено некорректное значение email';
        setErrors({...errors, [name]: err});
        setIsValid(false);
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
