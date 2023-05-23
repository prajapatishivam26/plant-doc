import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Login from "./components/main/Login";
import AboutUs from "./components/main/AboutUs";
import ContactUs from "./components/main/ContactUs";
import User from "./components/user";
import PredictPlantDisease from "./components/user/PredictPlantDisease";
import Signup from "./components/main/Signup";
import UserProvider from "./context/UserProvider";
import AdminProvider from "./context/AdminProvider";
import Prediction from "./components/user/Prediction";
import CurePage from "./components/user/CurePage";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/main/home" />} />
            <Route path="main" element={<Main />}>
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="contactus" element={<ContactUs />} />

            </Route>
            <Route path="user" element={<User />}>
              <Route path="predict1" element={<PredictPlantDisease />} />
              <Route path="predict" element={<Prediction />} />
              <Route path="cure" element={<CurePage />} />
            </Route>
          </Routes>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
