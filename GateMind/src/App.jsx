import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Screening from "./pages/Screening"
import Technical from "./pages/Technical"
import Problems from "./pages/problems"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
