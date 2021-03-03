import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

import InputField from 'Templates/form/InputField'
import InputPassword from 'Templates/form/InputPassword'
import { useHistory } from 'react-router-dom'
import * as types from './store/action_types'
import { makeGetErrorsLogin, makeGetIsAuthenticated } from './store/selector'

const initialDataUser = {
  username: '',
  password: '',
}

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const errors = makeGetErrorsLogin()
  const isAuthenticated = makeGetIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) history.push('/')
  }, [isAuthenticated])

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Vui lòng điền tên đăng nhập')
      .min(3, 'Tên đăng nhập phải có ít nhất 6 ký tự')
      .max(20, 'Tên đăng nhập không vượt quá 20 ký tự'),

    password: Yup.string()
      .required('Vui lòng điền mật khẩu')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(30, 'Mật khẩu không vượt quá 30 ký tự'),
  })

  const login = values =>
    dispatch({ type: types.S_AUTH_LOGIN_REQUEST, payload: values })

  return (
    <div>
      <Formik
        initialValues={initialDataUser}
        onSubmit={login}
        validationSchema={validationSchema}
      >
        <Form>
          <Field
            name="username"
            component={InputField}
            label="Họ tên"
            placeholder="Họ tên"
            errorText={errors.username}
          />
          <Field
            name="password"
            component={InputPassword}
            label="Mật khẩu"
            errorText={errors.password}
          />

          <button type="submit" className="text-lg">
            Đăng nhập
          </button>
        </Form>
      </Formik>
    </div>
  )
}
