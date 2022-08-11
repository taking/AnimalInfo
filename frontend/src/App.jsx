import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import UserData from './pages/UserData';
import Profile from './pages/Profile';
import AdminUser from './pages/AdminUser';
import AdminPrice from './pages/AdminPrice';
import AdminData from './pages/AdminData';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/list" element={<UserData />} />
        <Route path="/adm/users" element={<AdminUser />} />
        <Route path="/adm/price" element={<AdminPrice />} />
        <Route path="/adm/data" element={<AdminData />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </>
  );
}

export default App;
