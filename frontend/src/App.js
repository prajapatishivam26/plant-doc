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
import Logout from "./components/user/logout";

import Forgetpassword from "./components/main/Forgetpassword";
import UserProfile from "./components/user/UserProfile";

import TermsCondition from "./components/main/Termscondition.js";

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
              <Route path="forgetpassword" element={<Forgetpassword />} />
              <Route path="termscondition" element={<TermsCondition />} />

            </Route>
            <Route path="user" element={<User />}>
              <Route path="predict1" element={<PredictPlantDisease />} />
              <Route path="predict" element={<Prediction />} />
              <Route path="cure" element={<CurePage />} />
              <Route path="logout" element={< logout/>} />
            </Route>
          </Routes>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
