
import { useSelector } from 'react-redux'
import React, { useEffect, useLayoutEffect } from 'react'
import Login from '../Login/Login'
import { ROUTES } from '../../../routesName'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

const AuthRoutes = () => {
  const {auth = false} = useSelector(state=>state.auth)  
  const {pathname} = useLocation()
  const navigate = useNavigate()


if(auth){
  return <Navigate to={ROUTES.STATS} replace />
}
 if (!auth && pathname==ROUTES.STATS){
  return <Navigate to={ROUTES.LOGIN} replace />
}
  return (
   <>
       <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />

    </Routes>
   </>
  )
}

export default AuthRoutes