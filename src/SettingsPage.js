import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

import user from './firebase/user.js'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    width: '20em'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    height: '80%'
  },
}))

export default function AccountPage(){
  const classes = useStyles()
  const [uname, setUname] = useState(user.uname)
  const [newUname, setNewUname] = useState(user.uname)

  function handleChange(e){
    setNewUname(e.target.value)
  }

  function handleClick(){
    user.changeUname(newUname)
    setUname(newUname)
    setTimeout(() => setSnackOpen(true), 600)
  }

  function changed(){
    return newUname === uname
  }

  const [snackOpen, setSnackOpen] = useState(false)
  function handleSnackClose(){
    setSnackOpen(false)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" color="textSecondary" component="h1" className={classes.title}>
        アカウント情報
      </Typography>
      <TextField
        label="User ID"
        value={user.uid}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        disabled
      />
      <div className={classes.container}>
        <TextField
          error={!changed()}
          label="User Name"
          className={classes.textField}
          value={newUname}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={changed() ? '' : 'ユーザ名の変更を確定するには更新をクリック'}
        />
        <Button variant="contained" className={classes.button} onClick={handleClick} disabled={changed()}>
          更新
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackOpen}
          autoHideDuration={4000}
          onClose={handleSnackClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          TransitionComponent={Slide}
          message={
            <span id="message-id">変更が完了しました。リロードで反映されます</span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    </React.Fragment>
  )
}
