import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Interval from '../Interval/Interval'
import { ROUTES } from '../../../routesName'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import NotFound from '../NotFound/NotFound'
import AllCustomersPage from '../AllCustomersPage/AllCustomersPage'
import MarketStatsPage from '../MarketStatsPage/MarketStatsPage'
import CustomerDetailsPage from '../CustomerDetailsPage/CustomerDetailsPage'
import Login from '../Login/Login'
import AuthLayout from '../AuthLayout/AuthLayout'
const DashbordRoutes = () => {
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
      <Route path={ROUTES.LOGIN} element={<AuthLayout/>}>
      <Route index element={<Login />} />
      </Route>
    </Routes>
    </>
  )
}

export default DashbordRoutes