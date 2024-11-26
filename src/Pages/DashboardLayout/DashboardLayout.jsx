import { Navigate } from 'react-router-dom'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./../../components/Header"
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import { ROUTES } from '../../../routesName'
const DashboardLayout = () => {
  const auth = useSelector(state => state?.auth)
  const isAuth = auth?.auth
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  return (
    <Box sx={{
      position: "relative",
    }}>
      <Header />
      <Box sx={{
        position: "sticky",
        display: "flex",
        width: "100%",
        minHeight: "100dvh",
        mt: "100px"
      }}>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  )
}

export default DashboardLayout