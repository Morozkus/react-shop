import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Container } from 'react-bootstrap';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { userAPI } from './Service/UserService';
import { useAppDispatch } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';



function App() {
  const { data, error, isLoading } = userAPI.useCheckQuery(localStorage.getItem('token') || '')

  const dispatch = useAppDispatch()
  const { setIsAuth, setUser, setBasket } = userSlice.actions

  useEffect(() => {
    if (isLoading) {
      console.log('загрузка')
    }
    if (error) {
      console.log(error, data)
    }

    if (data) {
      dispatch(setIsAuth(true))
      dispatch(setUser({ data }))
      dispatch(setBasket(data.basket))
    }
  }, [data, error])

  return (
    <Container >
      <NavBar />
      <AppRouter />
    </Container>
  );
}

export default App;
