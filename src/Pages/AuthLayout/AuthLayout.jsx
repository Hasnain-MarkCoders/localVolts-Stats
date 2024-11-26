import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../../routesName'

const AuthLayout = () => {
    const auth = useSelector(state => state?.auth)
    const isAuth = auth?.auth
    if (isAuth) {
        return <Navigate to={ROUTES.STATS} replace />
    }
    return (
        <Outlet />
    )
}

export default AuthLayout