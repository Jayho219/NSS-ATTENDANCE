
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Components/Login';
import Home from './Components/Home';
import CustomNavbar from './Components/Partial/Navbar';
import AddAdmin from './Components/Admin/AddAdmin';
import ShowAdmins from './Components/Admin/ShowAdmins';
import ShowAdmin from './Components/Admin/ShowAdmin';
import AddUser from './Components/User/AddUser';
import ShowUsers from './Components/User/ShowUsers';
import ShowUser from './Components/User/ShowUser';
import AddEvent from './Components/Event/AddEvent';
import CurrentEvent from './Components/Event/CurrentEvents';
import PastEvent from './Components/Event/PastEvents';
import ShowEvent from './Components/Event/ShowEvent';
import ShowCurrentEvent from './Components/Event/ShowCurrentEvent';
import ShowPastEvent from './Components/Event/ShowPastEvent';
import NotFound404 from './Components/NotFound404'
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the authentication API functions
import { checkAuth } from './API/api'; 


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[isAdmin1, setIsAdmin1] = useState(false);
  const[isAdmin2, setIsAdmin2] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const list = await checkAuth();

      const isAuthenticated = list[0];

      const admin1 = (list[1] === 'Admin1' ? true : false);
      const admin2 = (list[1] === 'Admin2' ? true : false);

      setIsAuthenticated(isAuthenticated);
      if(admin1){
        setIsAdmin1(true);
      }
      else if(admin2){
        setIsAdmin2(true);
      }

      setLoading(false);
    };

    fetchAuthStatus();
  }, []);

  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route exact path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <NotFound404/> : <Login/>} />
        <Route path="/addAdmin" element={(isAuthenticated && isAdmin1) ? <AddAdmin/> : <Login/>} />
        <Route path="/showAdmins" element={(isAuthenticated && isAdmin1) ? <ShowAdmins/> : <Login/>} />
        <Route path="/addEvent" element={(isAuthenticated && isAdmin1) ? <AddEvent/> : <Login/>} />
        <Route path="/showCurrentEvents" element={(isAuthenticated && isAdmin1) ? <CurrentEvent/> : <Login/>} />
        <Route path="/showPastEvents" element={(isAuthenticated && isAdmin1) ? <PastEvent/> : <Login/>} />
        <Route path="/showCurrentEvent/:id" element={(isAuthenticated && isAdmin1) ? <ShowCurrentEvent/> : <Login/>} />
        <Route path="/showPastEvent/:id" element={(isAuthenticated && isAdmin1) ? <ShowPastEvent/> : <Login/>} />
        <Route path="/showUsers" element={(isAuthenticated && isAdmin1) ? <ShowUsers/> : <Login/>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};

export default App;
