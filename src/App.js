import './App.css';
import Navbar from './components/Navbar/Navbar'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import FriendsPage from './Pages/FriendsPage/FriendsPage';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/friends">
          <FriendsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
