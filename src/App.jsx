import Login from "./components/Login"
import Profile from "./components/Profile"
import Register from "./components/Register"
import { Routes, Route, Link } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
