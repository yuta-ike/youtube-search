import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { resetDb } from './firebase/videoManager.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/CheckRounded';
import RefuseIcon from '@material-ui/icons/ClearRounded';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import SimpleAppBar from './SimpleAppBar.js'
import FolderOperator from './FolderOperator.js'
import TestButton from './TestButton.js'

import { loginGoogle, logout } from './firebase/auth.js'
import user from './firebase/user.js'
import { getInvalidUsers, valifyUser } from './firebase/userManager.js'
import { pushHistory } from './uriChecker.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  title: {
    color: 'black',
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(6),
  },
  body:{
    color: 'black',
    marginLeft: theme.spacing(6),
  },
  button: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    textTransform: 'none',
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  table:{
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(6),
    margiBottom: theme.spacing(3),
    maxWidth: 500,
  },
  formControl:{
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(6),
  },
  wrapper: {
    border: 'solid 2px black'
  },
}))

export default withRouter(function ManagementPortal(props){
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [word, setWord] = useState("")
  const [invalidUsers, setInvalidUsers] = useState([])
  useEffect(() => {
    (async () => setInvalidUsers(await getInvalidUsers()))()
  }, [])

  function handleAllow(uid){
    valifyUser(uid)
    setInvalidUsers(invalidUsers.filter(({uid:_uid}) => _uid !== uid))
    setSnackOpen("valify")
  }

  function handleDeny(uid){
    setInvalidUsers(invalidUsers.filter(({uid:_uid}) => _uid !== uid))
    setSnackOpen("deny")
  }

  const [snackOpen, setSnackOpen] = useState(false)
  function handleSnackClose(){
    setSnackOpen(false)
  }

  const playlistTitles = ["ACCEL PARTY","Double Dutch Contest Japan","We Love Double Dutch & Grand Prix",
   "Double Dutch Delight","NF","JC","World Jump Rope & Championship","発表会など","その他外部イベント&大会"]
  const [selectedTitles, setSelectedTitles] = React.useState(Object.fromEntries(playlistTitles.map(key => [key, false])))
  const handleCheckBoxChange = name => event => {
    setSelectedTitles({ ...selectedTitles, [name]: event.target.checked });
  }
  const selectedNum = Object.values(selectedTitles).reduce((acc, c) => acc + c)

  if(!user.hasMasterAuth()) return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Typography variant="h4" color="textSecondary" component="h1" className={classes.title}>
          管理者ポータル
        </Typography>
        {
          user.hasDeveloperAuth() &&
          <TestButton onClick={()=>{}}/>
        }
        {
          !user.hasAdminAuth() ? (
            <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
              このページにアクセスするには管理者権限が必要です。
            </Typography>
          ):(
            <React.Fragment>
              <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
                新規ユーザーの承認
              </Typography>
              {
                invalidUsers.length === 0 ? (
                  <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
                    現在承認待ちのユーザーはいません
                  </Typography>
                ):(
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ユーザID</TableCell>
                        <TableCell align="center">許可</TableCell>
                        <TableCell align="center">拒否</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        invalidUsers.map(({uid}) => (
                          <TableRow key={uid}>
                            <TableCell className={classes.cell}>{uid}</TableCell>
                            <TableCell className={classes.cell} align="center">
                              <IconButton aria-label="allow" onClick={() => handleAllow(uid)}>
                                <CheckIcon fontSize="small" className={classes.cellButton}/>
                              </IconButton>
                            </TableCell>
                            <TableCell className={classes.cell} align="center">
                              <IconButton aria-label="allow" onClick={() => handleDeny(uid)}>
                                <RefuseIcon fontSize="small" className={classes.cellButton}/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                )
              }
              <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
                アップロード動画の登録
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
                このページにアクセスするにはマスターアカウントでのログインが必要です。
              </Typography>
              {
                user.hasAdminAuth() &&
                  <Button variant="contained" color="secondary" className={classes.button} onClick={() => loginGoogle(true)}>
                    Login
                  </Button>
              }
              <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
                フォルダ分けの設定
              </Typography>
              <FolderOperator/>

            </ React.Fragment>
          )
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={Boolean(snackOpen)}
          autoHideDuration={2000}
          onClose={handleSnackClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">{snackOpen === 'valify' ? 'ユーザーを【承認】しました' : 'ユーザーを【拒否】しました'}</span>}
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
    resetDb(word, Object.entries(selectedTitles).filter(([_, value]) => value).map(([name, _]) => name), true)
    setOpen(false)
  }

  function handleChange(e){
    setWord(e.target.value)
  }

  async function handleClickLogout(){
    pushHistory(props.history, '/login')
    await logout()
  }

  return (
    <div className={classes.root}>
      <SimpleAppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button variant="outlined" color="inherit" className={classes.button} onClick={handleClickLogout}>
          Exit
        </Button>
        <br/>
        <div className={classes.wrapper}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">アップロードするセクションの選択</FormLabel>
            <FormGroup>
              {
                playlistTitles.map(name => (
                  <FormControlLabel
                    key={name}
                    control={<Checkbox onChange={handleCheckBoxChange(name)} value={selectedTitles[name]} />}
                    label={name}
                  />
                ))
              }
            </FormGroup>
            <Typography>{playlistTitles.length}個中、{selectedNum}個選択</Typography>
          </FormControl>
          <br/>
          <Button disabled={selectedNum === 0} variant="contained" color="secondary" className={classes.button}>
            Update Database
          </Button>
          <Button disabled={selectedNum === 0} variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>
            Reset Database
          </Button>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">確認</DialogTitle>
          <DialogContent>
            <DialogContentText>
              データベースのリセットを実行すると現在登録されている動画に関するデータは全て破棄され、再度データを取得します。
              この処理には数分かかることがあります。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={`データベース更新用パスワードを入力してください`}
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
            <Button onClick={handleExecute} color="primary" variant="outlined" disabled={word.length === 0}>
              実行
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  )
})
