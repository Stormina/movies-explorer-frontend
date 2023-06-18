import { useState } from 'react';

export function useValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  function handleChange(event){
    setValues({...values, [event.target.name]: event.target.value});
    setErrors({...errors, [event.target.name]: event.target.validationMessage });
    setIsValid(event.target.closest(".auth__form").checkValidity());
  };

  function resetForm(){
      setValues({});
      setErrors({});
      setIsValid(false);
    }
    return {
      values, handleChange, errors, isValid, resetForm, setValues, setIsValid
    };
}

export default useValidator;