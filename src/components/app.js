import React from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'

import NavbarContainer from '../containers/navbar-container.js'
import Panel from './panel.js'

import Home from '../components/home.js'
import AccContainer from '../containers/acc-container.js'
import ImusContainer from '../containers/imus-container.js'
import RotationsContainer from '../containers/rotations-container.js'


const App = (state) => (
  <div id="app" className={state.sidenavToggled ? 'sidenav-toggled' : null}>
    <NavbarContainer />
    <div className="content-wrapper">
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/imu" />)} />
          <Route exact path="/imu" component={AccContainer} />
          <Route exact path="/imus" component={ImusContainer} />
          <Route exact path="/rotations" component={RotationsContainer} />
        </Switch>
      </div>
    </div>
  </div>
);

export default App
