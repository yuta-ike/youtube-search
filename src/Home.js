import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchBox from './SearchBox/SearchBoxInMenuBar.js'
import AppBar from './AppBar.js'
import NotificationButton from './Notification.js'
import ExtensionButton from './ExtensionButton.js'
import SideDrawer from './SideDrawer.js'
import VideoPage from './VideoPage.js'
import SettingsPage from './SettingsPage.js'
import ManagementPortal from './ManagementPortal.js'
import NotifyPortal from './NotifyPortal.js'
import Help from './Help.js'
import Information from './Information.js'
import TestButton from './TestButton.js'

import { store, observe } from './store.js'
import { pageDataSearch } from './action.js'
import { onAuthStateChanged, getName } from './firebase/auth.js'

const drawerWidth = 250

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]:{
      marginLeft: -drawerWidth,
    },
    marginLeft: "-100%",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  uname: {
    paddingLeft: theme.spacing(2),
  },
}));

let initialized = false

export default function Home(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [mainContent, setMainContent] = useState("")

  if(!initialized){
    observe('MAIN_CONTENT', value => {
      setMainContent(value)
      if(value.type != 'MAIN_PAGE') setOpen(false)
    })
    //初期化
    const type = props.match.params.pagetype
    if(type === 'main'){
      const vid = (props.location.search.match(/^\?vid=(?<vid>.+)$/) || {groups:{}}).groups.vid
      if(vid != null){
        store('MAIN_CONTENT', {type: 'MAIN_PAGE', params: {vid}})
      }else{
        store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
      }
    }else{
      store('MAIN_CONTENT', type != null ? {type} : {type: 'MAIN_PAGE'})
    }
    initialized = true
  }

  function handleHierarchyList(arr){
    store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
    store('BREADCRUMBS',arr)
  }

  const [name, setName] = useState(getName())
  onAuthStateChanged('Home', (state, user) => {
    if(state == 'SUCCESS'){
      setName(user.uname)
    }
  })

  let timer
  async function handleSearchBox(word){
    clearTimeout(timer)
    if(word !== ''){
      timer = setTimeout(() => {
        store('PAGE_DATA_SEARCH', pageDataSearch(word))
      }, 500)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar open={open} setOpen={setOpen}>
        <SearchBox onChange={handleSearchBox}/>
        <NotificationButton />
        <ExtensionButton />
        <Typography className={classes.uname} variant="body1">
          {name}
        </Typography>
      </AppBar>
      <SideDrawer open={open} handleHierarchyList={handleHierarchyList}/>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,
      })}>
        <div className={classes.drawerHeader} />
        {
          mainContent.type == "MAIN_PAGE" ?
            <VideoPage {...(mainContent.params || {})}/>
          :
          mainContent.type == 'managementportal' ?
            <ManagementPortal />
          :
          mainContent.type == 'notifyportal' ?
            <NotifyPortal />
          :
          mainContent.type == 'settings' ?
            <SettingsPage />
          :
          mainContent.type == 'help' ?
            <Help />
          :
          mainContent.type == 'information' ?
            <Information />
          :
          null
        }
      </main>
    </div>
  );
}
