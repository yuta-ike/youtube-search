import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import FolderHierarchy from './FolderHierarchy.js'
import mainFolderStructurePromise from './mainFolderStructure.js'
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
    [theme.breakpoints.up('sm')]:{
      width: drawerWidth,
    },
    width: "100%",
    flexShrink: 0,
  },
  drawerHeader: {
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    [theme.breakpoints.up('sm')]:{
      width: drawerWidth,
    },
    width: "100%",
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
  const [mainFolderStructure, setMainFolderStructure] = useState([])
  mainFolderStructurePromise.then(value => setMainFolderStructure(value))
  const [selected, setSelected] = useState(null)

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
          store('PAGE_DATA', pageData(hierarchy, 'SUB_FOLDER'))
          window.scrollTo(0, 0)
        }}
        properties={{selected, setSelected}}
      />
      <Divider />
      <FolderHierarchy
        folderStructure={mainFolderStructure}
        onClickFile={(_, hierarchy) => {
          props.handleHierarchyList(hierarchy)
          store('PAGE_DATA', pageData(hierarchy, 'MAIN_FOLDER'))
          window.scrollTo(0, 0)
        }}
        properties={{selected, setSelected}}
      />
    </Drawer>
  )
}
