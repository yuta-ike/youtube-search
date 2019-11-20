import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';

import { pushHistory } from './uriChecker.js'
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  function handleClick(event) {
    setOpen(!open)
    setAnchorEl(event.currentTarget);
  }

  async function handleMenu(type) {
    setOpen(false)
    switch(type){
      case 'LOGOUT':{
        pushHistory(props.history, '/login')
        await logout()
      }
      break
      case 'MANAGEMENT_PORTAL':{
        store('MAIN_CONTENT', {type: 'managementportal'})
        pushHistory(props.history, '/managementportal')
      }
      break;
      case 'SETTINGS':{
        store('MAIN_CONTENT', {type: 'settings'})
        pushHistory(props.history, '/settings')
      }
      break
      case 'NOTIFY_PORTAL':{
        store('MAIN_CONTENT', {type: 'notifyportal'})
        pushHistory(props.history, '/notifyportal')
      }
      break;
      case 'HELP':{
        store('MAIN_CONTENT', {type: 'help'})
        pushHistory(props.history, '/help')
      }
      break;
      case 'INFORMATION':{
        store('MAIN_CONTENT', {type: 'information'})
        pushHistory(props.history, '/information')
      }
      break
    }
  }

  return (
    <React.Fragment>
      <IconButton
          // edge="end"
          aria-label="Account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
        <MoreVertIcon />
      </IconButton>
      <Popover
        className={classes.modal}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenu}
        anchorOrigin={{vertical: props.modalDirection == 'bottom' ? 'bottom' : 'top', horizontal: 'center'}}
        transformOrigin={{vertical:props.modalDirection == 'bottom' ? 'top' : 'bottom', horizontal: 'center'}}
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
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('SETTINGS',e)}>アカウント</MenuItem>
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('INFORMATION',e)}>このサービスについて</MenuItem>
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('HELP',e)}>ヘルプ</MenuItem>
        <Divider />
        <MenuItem className={classes.menuItems} onClick={() => window.location.reload(true)}>
          <RefreshIcon className={classes.icon}/>
          リロード
        </MenuItem>
        <MenuItem className={classes.menuItems} onClick={e => handleMenu('LOGOUT', e)}>
          <ExitToAppIcon className={classes.exitIcon}/>
          ログアウト
        </MenuItem>
      </Popover>
    </React.Fragment>
  )
})
