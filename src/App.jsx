import AuthRoutes from "./Pages/AuthRoutes/AuthRoutes"
import { useSelector } from "react-redux"
import DashboardRoutes from "./Pages/DashboardRoutes/DashboardRoutes"
function App() {
  const { auth = false } = useSelector(state => state?.auth)
  if (auth) {
    return (
      <DashboardRoutes />
    )
  }
  return (
    <AuthRoutes />
  )
}

export default App
