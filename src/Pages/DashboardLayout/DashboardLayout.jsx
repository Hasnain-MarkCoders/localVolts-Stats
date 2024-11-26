import { Navigate } from 'react-router-dom'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./../../components/Header"
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Sidebar from '../../components/Sidebar'
const DashboardLayout = () => {
const {auth = false} = useSelector(state=>state.auth)
if(!auth){
  return <Navigate to="/login" replace />
}
  return (
    <Box sx={{
      position:"relative",
    }}>
    <Header/>
    <Box sx={{
      position:"sticky",
      display:"flex",
      width:"100%",
      minHeight:"100dvh",
      mt:"100px"
    }}>
    <Sidebar/>
    <Box sx={{flex:1}}>
    <Outlet/>
    </Box>

    </Box>
    </Box>
  )
}

export default DashboardLayout