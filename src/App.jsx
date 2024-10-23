import { BrowserRouter, Routes, Route } from "react-router-dom"
import Stats from "./Pages/Stats/Stats"
import Interval from "./Pages/Interval/Interval"


function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Stats />} />
        <Route path="interval" element={<Interval />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
