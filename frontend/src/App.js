import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './homepage/pages/Homepage';
import Navbar from './shared/components/navbar/Navbar';
import Footer from './shared/components/Footer';
import LoginSociety from './login/pages/LoginSociety';
import SignupSociety from './signup/pages/SignupSociety';
import SignupSociety2 from './signup/pages/SignupSociet2';
import SocietyRegistrationForm from './signup/pages/MaintenanceSociety';
import SocietyProfile from './profile/pages/SocietyProfile';
import FlatsInformation from './profile/pages/FlatsInformation';
import CommunityNoticeBoardDriver from './community communication/CommunityNoticeBoardDriver';

import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';


function App() {

  const { isAdmin, token, login, logout } = useAuth();

  let routes;
  if (token) {
    
      routes = (
        <>
          <Switch>
            <Route path='/' exact>
              {/* <FlatsInformation /> */}
            </Route>
            <Route path='/profile' exact>
              <SocietyProfile />
            </Route>
            <Route path='/flatsInformation' exact>
              <FlatsInformation />
            </Route>
            <Route path='/dashboard' exact>
              <SocietyProfile />
            </Route>
            <Route path='/notice' exact>
              <CommunityNoticeBoardDriver />
            </Route>
            <Redirect to='/' />
          </Switch>
        </>
      )
    
  } else {
    routes = (
      <>
        <Switch>
          <Route path='/' exact>
            <Homepage />
          </Route>
         
          <Route path='/login' exact>
            <LoginSociety />
          </Route>
          
          <Route path='/signup' exact>
            <SignupSociety />
          </Route>
          <Route path='/signup/signup-society-2' exact>
            <SignupSociety2 />
          </Route>
          <Route path='/signup/signup-society-3' exact>
          <SocietyRegistrationForm />
          </Route>
          <Redirect to='/' />
        </Switch>
      </>
    )
  }

  return (
    <Router>
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        isAdmin: isAdmin,
        token: token,
        login: login,
        logout: logout
      }}>

        
      <Navbar />
        <main>{routes}</main>
      <Footer />

      </AuthContext.Provider>

    </Router>
  );
}


export default App;