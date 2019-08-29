import React from 'react';
import { Redirect } from 'react-router-dom'
import { authenticated, masterAuthenticated } from './firebase/auth.js'
import urls from './urlManager.js'

export default function Auth(props){
  urls[0] = props.location.pathname + props.location.search
  return (
    <div>
      { masterAuthenticated() ? props.master : authenticated() ? props.normal : props.default }
    </div>
  )
}
