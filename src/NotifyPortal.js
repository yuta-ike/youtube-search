import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { notify } from './firebase/info.js'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(4),
    textTransform: 'none',
  },
  textField: {
    width: "25rem",
    margin: theme.spacing(4),
  },
  title: {
    color: 'black',
    margin: theme.spacing(4),
  },
  body:{
    color: 'black',
    marginLeft: theme.spacing(6),
  },
}));

export default function NotifyPortal(){
  const classes = useStyles()

  const [message, setMessage] = useState("")
  function handleChange(e){
    setMessage(e.target.value)
  }

  const [open, setOpen] = React.useState(false)
  function handleClose(){
    setOpen(false)
  }
  function handleClick(){
    setOpen(true)
  }

  const [snackBarOpen, setSnackBarOpen] = useState(false)
  function handleNotify(){
    notify(message)
    setMessage("")
    setOpen(false)
    setSnackBarOpen(true)
  }

  function handleSnackBarClose(){
    setSnackBarOpen(false)
  }

  return (
    <React.Fragment>
      <Typography variant="h5" color="textSecondary" component="h1" className={classes.title}>
        通知ポータル
      </Typography>
      <TextField
        id="outlined-name"
        label="通知内容"
        className={classes.textField}
        value={message}
        onChange={handleChange}
        autoFocus
      />
      <Button variant="outlined" color="primary" className={classes.button} onClick={handleClick}>
        通知する
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"本当に通知しますか"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            登録されたメッセージはデータベースに登録され、全ユーザーに通知されます
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleNotify} color="primary">
            通知
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span id="message-id">通知しました。（リロードで通知を反映）</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleSnackBarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </React.Fragment>
  )
}
