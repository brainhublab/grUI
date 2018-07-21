import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import NavbarContainer from '../containers/navbar-container.js'
import Panel from './panel.js'

import Home from '../components/home.js'
import AccContainer from '../containers/acc-container.js'
import ImusContainer from '../containers/imus-container.js'


const App = (state) => (
  <div id="app" className={state.sidenavToggled ? 'sidenav-toggled' : null}>
    <NavbarContainer />
    <div className="content-wrapper">
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/raw_data" component={AccContainer} />
          <Route exact path="/trajectory" component={ImusContainer} />
        </Switch>
      </div>
    </div>
  </div>
);

export default App
