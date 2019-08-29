import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { updateDb } from './firebase/videoManager.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SimpleAppBar from './SimpleAppBar.js'

import { loginGoogle, logout } from './firebase/auth.js'
import user from './firebase/user.js'
import { store } from './store.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
    textTransform: 'none',
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
}))

const keyword = "confirm"

export default withRouter(function ManagementPortal(props){
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [word, setWord] = useState("")

  if(!user.hasMasterAuth()) return (
    <div className={classes.root}>
      <SimpleAppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="body1" color="textSecondary" component="p" className={classes.title}>
          {
            !user.hasAdminAuth() ?
              'このページにアクセスするには管理者権限が必要です。'
            :
              'このページにアクセスするにはマスターアカウントでのログインが必要です。'
          }
        </Typography>
        {
          user.hasAdminAuth() &&
            <Button variant="contained" color="secondary" className={classes.button} onClick={() => loginGoogle(true)}>
              Login
            </Button>
        }
      </main>
    </div>
  )

  function handleClickOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  function handleExecute(){
    updateDb(true)
    setOpen(false)
  }

  function handleChange(e){
    setWord(e.target.value)
  }

  async function handleClickLogout(){
    props.history.push('/login')
    await logout()
  }

  return (
    <div className={classes.root}>
      <SimpleAppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickLogout}>
          Logout
        </Button>
        <Button variant="contained" color="secondary" className={classes.button}>
          UpdateDB
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
          ResetDB
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">確認</DialogTitle>
          <DialogContent>
            <DialogContentText>
              データベースのリセットを実行すると現在登録されている動画に関するデータは全て破棄され、再度データを取得します。この処理には数分かかることがあります。よろしいですか。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={`よろしければ確認のために「${keyword}」と入力してください`}
              type="confirm"
              fullWidth
              onChange={handleChange}
              value={word}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={handleExecute} color="primary" variant="outlined" disabled={word != keyword}>
              実行
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
})
