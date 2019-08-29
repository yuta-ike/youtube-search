import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import FolderHierarchy from './FolderHierarchy.js'
import mainFolderStructure from './mainFolderStructure.js'
import subFolderStructure from './subFolderStructure.js'
import { store } from './store.js'
import { pageData } from './action.js'

const drawerWidth = 250

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  breadcrumbs: {
    paddingLeft: '32px',
    paddingTop: theme.spacing(2),
    marginBottom: '-12px'
  }
}));

export default function SideDrawer(props){
  const classes = useStyles();
  const { open } = props

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader} />
      <FolderHierarchy
        folderStructure={subFolderStructure}
        onClickFile={(_, hierarchy) => {
          props.handleHierarchyList(hierarchy)
          store('PAGE_UPDATE', pageData(hierarchy, 24))
          window.scrollTo(0, 0)
        }}
      />
      <Divider />
      <FolderHierarchy
        folderStructure={mainFolderStructure}
        onClickFile={(_, hierarchy) => {
          props.handleHierarchyList(hierarchy)
          store('PAGE_UPDATE', pageData(hierarchy, 24))
          window.scrollTo(0, 0)
        }}
      />
    </Drawer>
  )
}
