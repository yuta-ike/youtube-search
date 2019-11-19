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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  "@media screen and (orientation: landscape)":{
    appBar: {
      display: "none"
    }
  },
  "@media screen and (orientation: portrait)":{
    appBar: {
      top: 'auto',
      bottom: 0,
      left: 0,
      width: "100%",
      zIndex: theme.zIndex.modal + 1,
      height: "9%",
    },
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    margin: '0 auto',
    fontSize: 50,
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function MyAppBar(props){
  const classes = useStyles()

  return (
    // <Slide appear={false} direction="up" in={!props.hide}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
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
