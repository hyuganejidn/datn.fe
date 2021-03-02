import React from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from 'Templates/form/InputField'
import InputPassword from 'Templates/form/InputPassword'

const initialDataUser = {
  fullName: '',
  username: '',
  password: '',
  passwordConfirm: '',
}

export default function Register() {
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

  return (
    <div>
      <Formik
        initialValues={initialDataUser}
        onSubmit={(values, actions) => console.log(values, actions)}
        validationSchema={validationSchema}
      >
        <Form>
          <FastField
            name="fullName"
            component={InputField}
            label="Ít nhất 3 ký tự"
            placeholder="Họ và Tên"
          />
          <FastField
            name="username"
            component={InputField}
            label="Tên đăng nhập"
            helperText="Viết liền không dấu, không ký tự đặc biệt(nickname)"
          />
          <FastField
            name="password"
            component={InputPassword}
            label="Mật khẩu"
            helperText="Ít nhất 6 ký tự"
          />
          <FastField
            name="passwordConfirm"
            component={InputField}
            label="Mật khẩu xác nhận"
            helperText="Ít nhất 6 ký tự"
          />
          <button type="submit" className="text-lg">
            Đăng ký
          </button>
        </Form>
      </Formik>
    </div>
  )
}
