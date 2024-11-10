import { Routes, Route, Link } from "react-router-dom";
import LandingPage from './LandingPage';
import Home from './Home/Home'

const TheRoutes = () => {
  return (
    <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/Home" element={<Home />} />
    </Routes>
  )
}

export default TheRoutes