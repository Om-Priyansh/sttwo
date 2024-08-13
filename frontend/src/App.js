import './App.css';

import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';

import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import Signup from './signup/signup/pages/Signup';
import SignupSociety from './signup/signupSociety/pages/SignupSociety';

function App() {
  return (<Router>
    <Navbar/>
    <Switch>
      <Route path='/' exact>
        <Homepage/>
      </Route>signup/
      <Route path='/signup' exact>
        <Signup/>
      </Route>
      <Route path='/signup/signup-owner' exact>
        <Homepage/>
      </Route>
      <Route path='/signup/signup-society' exact>
        <SignupSociety/>
      </Route>

      <Redirect to='/'/>
    </Switch>
  </Router>);
}

export default App;