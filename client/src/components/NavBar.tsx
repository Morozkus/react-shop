import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { AUTH_ROUTES, PUBLIC_ROUTES } from '../routes/router'
import { useAppSelector } from '../hooks/redux'
import { useDispatch } from 'react-redux'
import { userSlice } from '../store/reducers/UserSlice'


const NavBar = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { setIsAuth, setUser, setBasket } = userSlice.actions
  const { isAuth } = useAppSelector(state => state.user)

  function getOut() {
    dispatch(setIsAuth(false))
    setUser({})
    setBasket(null)
    localStorage.removeItem('token')
    navigate(PUBLIC_ROUTES.LOGIN_ROUTE)
  }

  return (
    <Navbar className='p-2' bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: 'white', textDecoration: 'none' }} to={PUBLIC_ROUTES.SHOP_ROUTE}>КупиДевайс</NavLink>
        <Nav className='ms-auto' style={{ color: 'white' }}>
          {isAuth ?
            <>
              <Button variant={"outline-light"} onClick={() => navigate(AUTH_ROUTES.ADMIN_ROUTE)}>Админ панель</Button>
              <Button variant={'info'} className='ms-2' onClick={() => navigate(AUTH_ROUTES.BASKET_ROUTE)}>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" 
                  stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button variant={"outline-light"} className='ms-2' onClick={getOut}>Выйти</Button>
            </>
            :
            <Button variant={"outline-light"} onClick={() => navigate(PUBLIC_ROUTES.LOGIN_ROUTE)}>Авторизация</Button>
          }
        </Nav>
      </Container>

    </Navbar>
  )
}

export default NavBar