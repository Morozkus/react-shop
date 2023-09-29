import React, { useState } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../routes/router'
import { userAPI } from '../Service/UserService'
import { decode } from '../utils/decode'
import { useAppDispatch } from '../hooks/redux'
import { userSlice } from '../store/reducers/UserSlice'
import { IDataUser } from '../models/User'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoginPath = location.pathname === PUBLIC_ROUTES.LOGIN_ROUTE

  const dispatch = useAppDispatch()
  const { setIsAuth, setUser, setBasket } = userSlice.actions

  const [loginUser, { }] = userAPI.useLoginUserMutation()
  const [registrationUser, { }] = userAPI.useRegistrationUserMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function goAuthorization() {
    let user: IDataUser
    try {
      if (isLoginPath) {
        user = await loginUser({ email, password }).unwrap()
      } else {
        user = await registrationUser({ email, password }).unwrap()
      }

      dispatch(setUser({ token: decode(user.token) }))
      dispatch(setIsAuth(true))
      dispatch(setBasket(user.basket))
      localStorage.setItem('token', 'Bearer ' + user.token)
      navigate(PUBLIC_ROUTES.SHOP_ROUTE)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>{isLoginPath ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш пароль...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
          {
            isLoginPath ?
              <div>Нет Аккаунта? <NavLink to={PUBLIC_ROUTES.REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></div>
              :
              <div>Есть аккаунт? <NavLink to={PUBLIC_ROUTES.LOGIN_ROUTE}>Войдите!</NavLink></div>
          }
          <Button onClick={() => goAuthorization()} variant={'outline-success'}>
            {isLoginPath ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </div>

      </Card>

    </Container>
  )
}

export default Auth