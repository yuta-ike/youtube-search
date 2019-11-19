import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './Home.js'
import M_Home from './M_Home.js'
import Login from './Login.js'
import ManagementPortal from './ManagementPortal.js'
import Auth from './Auth.js'

function DesktopPage(){
  return(
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
        notAuthenticated={
          <Switch>
            <Redirect to="/login" />
          </Switch>
        }
      />
    </Switch>
  )
}

function MobilePage(){
  document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, {passive: false})

  return(
    <Switch>
      <Route path="/m/login" component={Login} />
      <Auth
        normal={
          <Switch>
            <Route path="/m/:pagetype(main|account|settings|help|information|notifyportal|managementportal)" component={M_Home} />
            <Redirect to="/m/main" />
          </Switch>
        }
        master={
          <Switch>
            <Route path="/m/" component={ManagementPortal} />
            <Redirect to="/m/main" />
          </Switch>
        }
        notAuthenticated={
          <Switch>
            <Redirect to="/m/login" />
          </Switch>
        }
      />
    </Switch>
  )
}

export default function App(props){
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/m/" component={MobilePage}/>
        <Route path="/" component={DesktopPage}/>
      </Switch>
    </Router>
  )
}