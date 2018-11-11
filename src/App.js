import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import Landing from './components/layout/Landing';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/landing" component={Landing} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
