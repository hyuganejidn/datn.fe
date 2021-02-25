import React from 'react'
import { Field } from 'formik'

function InputField(props) {
  const {
    field,
    form,
    label,
    disabled,
    type,
    placeholder,
    autoComplete,
  } = props
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  console.log(form)

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        {...field}
        id={name}
        validate={showError}
        type={type || 'text'}
        placeholder={placeholder}
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
      />

      {showError && <div>{errors[name]}</div>}
      {/* <ErrorMessage name={name} component={<FormFeedback />} /> */}
    </div>
  )
}

export default InputField
