import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import registerPage from './components/views/RegisterPage/RegisterPage.js';
import Auth from './hoc/auth.js';

function App() {
  return (
    <Router>
    <div>
      
      <Switch>
        <Route exact path="/" component={Auth(LandingPage,null)} /> {/*아래 register와같은표현 */}
        <Route exact path="/login" component={Auth(LoginPage,false)} />
        <Route exact path="/register" component={Auth(registerPage,false)} /> {/*exact: 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여줌 */}
       
      </Switch>
    </div>
  </Router>
  );
}

export default App;
