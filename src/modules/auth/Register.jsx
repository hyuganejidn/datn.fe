import React, { useEffect } from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import InputField from 'Templates/form/InputField'
import InputPassword from 'Templates/form/InputPassword'
import * as types from './store/action_types'
import { makeGetErrorsSignUp, makeGetIsAuthenticated } from './store/selector'

const initialDataUser = {
  fullName: '',
  username: '',
  password: '',
  passwordConfirm: '',
}

export default function Register() {
  const dispatch = useDispatch()
  const history = useHistory()

  const errors = makeGetErrorsSignUp()
  const isAuthenticated = makeGetIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) history.push('/')
  }, [isAuthenticated])

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Vui lòng điền Họ tên')
      .min(3, 'Họ tên phải có ít nhất 6 ký tự')
      .max(60, 'Họ tên không vượt quá 60 ký tự'),

    username: Yup.string()
      .required('Vui lòng điền Tên đăng nhập')
      .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
      .max(20, 'Tên đăng nhập không vượt quá 20 ký tự'),

    password: Yup.string()
      .required('Vui lòng điền Mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(30, 'Mật khẩu không vượt quá 30 ký tự'),

    passwordConfirm: Yup.string()
      .required('Vui lòng xác nhận lại Mật khẩu')
      .oneOf([Yup.ref('password')], 'Mật khẩu không giống'),
  })

  const signIn = values => dispatch({ type: types.S_AUTH_SIGNUP_REQUEST, payload: values })

  return (
    <div>
      <Formik initialValues={initialDataUser} onSubmit={signIn} validationSchema={validationSchema}>
        <Form>
          <FastField
            name="fullName"
            component={InputField}
            label="Họ và Tên"
            placeholder="Họ và Tên"
            helperText="Ít nhất 3 ký tự"
            errorText={errors.fullName}
          />
          <FastField
            name="username"
            component={InputField}
            label="Tên đăng nhập"
            helperText="Viết liền không dấu, không ký tự đặc biệt(nickname)"
            errorText={errors.username}
          />
          <FastField
            name="password"
            component={InputPassword}
            label="Mật khẩu"
            helperText="Ít nhất 6 ký tự"
            errorText={errors.password}
          />
          <FastField
            name="passwordConfirm"
            component={InputField}
            label="Mật khẩu xác nhận"
            helperText="Ít nhất 6 ký tự"
            errorText={errors.passwordConfirm}
          />
          <button type="submit" className="text-lg">
            Đăng ký
          </button>
        </Form>
      </Formik>
    </div>
  )
}
