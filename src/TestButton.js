import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { resetAlgolia } from './firebase/videoManager.js'

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(6),
    textTransform: 'none',
  },
}))

export default function TestButton (){
  const classes = useStyles()

  const handleClick = () => {
    resetAlgolia()
  }
  return (
    <Button variant="outlined" color="inherit" onClick={handleClick} className={classes.button}>
      Test
    </Button>
  )
}
