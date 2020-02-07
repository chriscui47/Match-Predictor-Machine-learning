import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { About } from './About';
import { Leaderboard } from './Leaderboard';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';

function App() {
  return (
    <React.Fragment> 
      <NavigationBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/Leaderboard" component={Leaderboard}/>
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </Layout> 
    </React.Fragment>
  );
}

export default App;
