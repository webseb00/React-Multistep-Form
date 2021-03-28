import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/" component={FirstStep} exact={true} />
          <Route path="/second" component={SecondStep} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;