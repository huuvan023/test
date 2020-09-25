import React, { useContext, useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Test from './pages/test';
import UserProfile from './pages/user';
import AuthRoute from './utils/AuthRoute';
import PrivateRoute from './utils/PrivateRoute';
import SignUp from './pages/signup';
import { store } from './store/store';


function App() {
  const globalState = useContext(store)

  return (
    
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/test" component={Test}/>
              <PrivateRoute exact path="/" component={Home} authenticated={ globalState.state.authenticated }/>
              <PrivateRoute exact path="/user" component={UserProfile} authenticated={ globalState.state.authenticated }/>
              <AuthRoute exact path="/login" component={Login} authenticated={ globalState.state.authenticated } />
              <AuthRoute exact path="/signup" component={SignUp} authenticated={ globalState.state.authenticated } />
            </Switch>
          </Router>
        </div>
   
    
  );
}

export default App;
