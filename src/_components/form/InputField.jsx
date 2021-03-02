import React from 'react'
import { ErrorMessage } from 'formik'
import { FormHelperText, TextField } from '@material-ui/core'

function InputField(props) {
  const {
    field,
    form,
    label,
    disabled,
    type,
    placeholder,
    autoComplete,
    helperText,
    errorText,
  } = props

  const { name } = field
  const { errors, touched } = form

  const showError = (errors[name] && touched[name]) || !!errorText

  return (
    <div className="form-group">
      <TextField
        {...field}
        id={name}
        label={label}
        error={showError}
        type={type || 'text'}
        helperText={helperText}
        placeholder={placeholder}
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
        aria-describedby={`${name}-error`}
      />

      {showError && (
        <div
          className="MuiFormHelperText-root"
          style={{ color: 'red', fontSize: '0.75rem' }}
        >
          {errorText}
        </div>
      )}

      <ErrorMessage
        name={name}
        component={() => (
          <FormHelperText id={`${name}-error`} style={{ color: 'red' }}>
            {errors[name]}
          </FormHelperText>
        )}
      />
    </div>
  )
}

export default InputField
