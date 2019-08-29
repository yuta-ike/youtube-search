import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './Home.js'
import Login from './Login.js'
import ManagementPortal from './ManagementPortal.js'
import Auth from './Auth.js'

export default function App(props){
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/login" component={Login} />
        <Auth
          normal={
            <Switch>
              <Route path="/:pagetype(main|account|settings|help|information|notifyportal|managementportal)" component={Home} />
              <Redirect to="/main" />
            </Switch>
          }
          master={
            <Switch>
              <Route path="/" component={ManagementPortal} />
            </Switch>
          }
          default={
            <Switch>
              <Redirect to="/login" />
            </Switch>
          }
        />
      </Switch>
    </Router>
  )
}
// <Route exact path={['/','/account','/settings', '/managementportal', '/help', '/information', '/notifyportal']} component={Home} />
