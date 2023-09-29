import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes/router';
import { useAppSelector } from '../hooks/redux';
import Shop from '../pages/Shop';

const AppRouter = () => {
  const { isAuth } = useAppSelector(state => state.user)

  return (
    <Routes>

      {isAuth && authRoutes.map(route =>
        <Route path={route.path} Component={route.Component} />
      )}

      {publicRoutes.map(route =>
        <Route path={route.path} Component={route.Component} />
      )}

      <Route path='*' Component={Shop} />
    </Routes>
  )
}

export default AppRouter