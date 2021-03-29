import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';

const App = () => {

  const [user, setUser] = useState({});

  const updateUser = data => {
    setUser({ ...user, ...data });
  }

  const resetUser = () => setUser({});

  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route 
            path="/" 
            render={props => <FirstStep {...props} user={user} updateUser={updateUser} />}
            exact={true} 
          />
          <Route 
            path="/second" 
            render={props => <SecondStep {...props} user={user} updateUser={updateUser} />}
            />
          <Route 
            path="/third" 
            render={props => <ThirdStep {...props} user={user} />}
            />
        </Switch>

      </div>
    </Router>
  );
}

export default App;