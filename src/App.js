import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Blogpage from './components/Blogpage';
import Loginpage from './components/Loginpage';
import Registerpage from './components/Registerpage';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <div>
      <Router>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <div className="App">
          <Route path="/" exact><Homepage isAuth={isAuth} /></Route>
          <Route path="/createblog"><Blogpage isAuth={isAuth} /></Route>
          <Route path="/login"><Loginpage setIsAuth={setIsAuth} /></Route>
          <Route path="/register"><Registerpage /></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
