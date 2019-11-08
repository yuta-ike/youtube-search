import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(theme => ({
  grid:{
    textAlign: 'center',
    justify: 'center'
  }
}))

export default function ProgressButton(props){
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid} spacing={1} justify='center'>
        <Grid item xs={1}>
          {props.left}
        </Grid>
        <Grid item xs>
          <ButtonGroup aria-label="progress buttons">
            <Button disabled={!props.canClickBack}>
              <ArrowBackIcon onClick={props.onClickBack}/>
            </Button>
            <Button disabled={!props.canClickNext}>
              <ArrowForwardIcon onClick={props.onClickNext}/>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={1}>
          {props.right}
        </Grid>
      </Grid>
    </div>
  )
}
