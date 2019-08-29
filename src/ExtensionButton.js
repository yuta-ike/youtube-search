import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton';
// import AccountCircle from '@material-ui/icons/AccountCircle'
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { store } from './store.js'
import { logout, hasAdminAuth, hasDeveloperAuth, loginGoogle } from './firebase/auth.js'

const useStyles = makeStyles(theme => ({
  menuItems: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}))

export default withRouter(function ExtensionButton(props){
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  async function handleMenu(type) {
    setAnchorEl(null)
    switch(type){
      case 'LOGOUT':{
        props.history.push('/login')
        await logout()
      }
      break
      case 'MANAGEMENT_PORTAL':{
        store('MAIN_CONTENT', {type: 'managementportal'})
        props.history.push('/managementportal')
      }
      break;
      case 'SETTINGS':{
        store('MAIN_CONTENT', {type: 'settings'})
        props.history.push('/settings')
      }
      break
      case 'NOTIFY_PORTAL':{
        store('MAIN_CONTENT', {type: 'notifyportal'})
        props.history.push('/notifyportal')
      }
      break;
      case 'HELP':{
        store('MAIN_CONTENT', {type: 'help'})
        props.history.push('/help')
      }
      break;
      case 'INFORMATION':{
        store('MAIN_CONTENT', {type: 'information'})
        props.history.push('/information')
      }
      break
    }
  }

  return (
    <React.Fragment>
      <IconButton
          edge="end"
          aria-label="Account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
        <SettingsIcon />
      </IconButton>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenu}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        {
          hasAdminAuth() ?
          <MenuItem className={classes.menuItems} onClick={e => handleMenu('MANAGEMENT_PORTAL',e)}>Management Portal (experiments)</MenuItem>
          : null
        }
        {
          hasDeveloperAuth() ?
          <MenuItem className={classes.menuItems} onClick={e => handleMenu('NOTIFY_PORTAL',e)}>Notify Portal (under dev)</MenuItem>
          : null
        }
        {
          hasAdminAuth() ? <Divider /> : null
        }
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('SETTINGS',e)}>Settings</MenuItem>
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('HELP',e)}>Help</MenuItem>
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('INFORMATION',e)}>Infomation</MenuItem>
        <Divider />
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('LOGOUT', e)}>
          <ExitToAppIcon className={classes.exitIcon}/>
          Logout
        </MenuItem>
      </Popover>
    </React.Fragment>
  )
})
