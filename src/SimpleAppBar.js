import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  title:{
    flexGrow: 1,
  },
  barButton: {
    borderWidth: "2px",
    fontWeight: "bold",
  },
}))

export default function SimpleAppBar(){
  const classes = useStyles()

  return(
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {'U-Search (beta)'}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
