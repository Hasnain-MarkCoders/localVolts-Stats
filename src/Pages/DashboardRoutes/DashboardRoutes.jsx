import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Stats from '../Stats/Stats'
import Interval from '../Interval/Interval'
import { ROUTES } from '../../../routesName'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import NotFound from '../NotFound/NotFound'
import AllCustomersPage from '../AllCustomersPage/AllCustomersPage'
import { useSelector } from 'react-redux'
import MarketStatsPage from '../MarketStatsPage/MarketStatsPage'
import CustomerDetailsPage from '../CustomerDetailsPage/CustomerDetailsPage'
const DashbordRoutes = () => {
  const {auth = false} = useSelector(state=>state.auth)  
  const {pathname} = useLocation()
   if (auth && pathname==ROUTES.LOGIN){
    return <Navigate to={ROUTES.STATS} replace />
  }


  return (
    <>
    <Routes>
      
      <Route path={ROUTES.STATS} element={<DashboardLayout/>}>
      <Route index element={<MarketStatsPage />} />
      <Route path={ROUTES.CUSTOMERS} element={<AllCustomersPage />} />

        <Route path={ROUTES.CUSTOMER} element={<CustomerDetailsPage />} />
        <Route path={ROUTES.INTERVAL} element={<Interval />} />
      </Route>
      <Route path={ROUTES.NOTFOUND} element={<NotFound />} />

    </Routes>
    </>
  )
}

export default DashbordRoutes