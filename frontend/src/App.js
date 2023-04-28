import logo from './logo.svg';
import './App.css';
import Main from './components/main';
import { BrowserRouter,Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import Login from './components/main/Login';
import User from './components/user';
import PredictPlantDisease from './components/user/PredictPlantDisease';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='main' element={<Main />} >
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />

        </Route>
        <Route path='user' element={<User />} >
          <Route path='predict' element={<PredictPlantDisease />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
