import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import FolderIcon from '@material-ui/icons/Folder';

import { sendMail } from './firebase/functions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    margin: '0 auto',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function MyAppBar(props){
  const classes = useStyles()
  // const { open, setOpen } = props

  // function handleDrawerOpen() {
  //   setOpen(!open);
  // }

  return (
    // <Slide appear={false} direction="up" in={!props.hide}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
            <FolderIcon />
          </IconButton> */}
          {props.right}
          <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={props.onClickCenter}>
            <FolderIcon />
          </Fab>
          <div className={classes.grow} />
          {props.left}
        </Toolbar>
      </AppBar>
    // </Slide>
  )
}
