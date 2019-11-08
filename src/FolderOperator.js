import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import folderJSON from './mainFolderStructure.js'

import { configdb } from './firebase/core/database.js'


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    textTransform: 'none',
  },
  text: {
    marginLeft: theme.spacing(6),
  }
}))

export default function FolderOperator(){
  const classes = useStyles()

  async function JSONtoFirestore(obj){
    configdb.doc('folders').set(obj)
  }

  async function getJSONfromFirestore(){
    console.log(await configdb.doc('folders').get())
  }

  function handleConfirm(){
    JSONtoFirestore(folderJSON)
    getJSONfromFirestore()
  }

  function handleRead(){
    getJSONfromFirestore()
  }

  return (
    <React.Fragment>
      <Typography className={classes.text}>Comming soon...</Typography>
      <br />
      <Button disabled variant="contained" color="secondary" className={classes.button} onClick={handleRead}>
        読み取り
      </Button>
      <Button disabled variant="contained" color="secondary" className={classes.button} onClick={handleConfirm}>
        決定
      </Button>
    </React.Fragment>
  )
}
