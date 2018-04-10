import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './assets/style/App.css';

import Header from './components/Header';
import Home from './containers/Home';
import Time from './containers/Time/index';
// import Towns from './containers/Towns';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>


          <Route exact path="/" component={Home} />
          <Route path="/time" component={Time} />
          {/*<Route path="/towns" component={Towns} />*/}

        </div>
      </Router>
    );
  }
}

export default App;
