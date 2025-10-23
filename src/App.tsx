import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Applications, NotFound } from "./components/page"
import { Navbar } from "./components/common"

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Applications />} />
        <Route path="/reports" element={<NotFound />} />
        <Route path="/guide" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
