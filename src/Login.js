import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createGlobalStyle } from 'styled-components';
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import SimpleAppBar from './SimpleAppBar.js'

import { loginGoogle, onAuthStateChanged, logout } from './firebase/auth.js'
import user from './firebase/user.js'
import { getPath } from './uriChecker.js'

const GlobalStyle = createGlobalStyle`@import url("https://fonts.googleapis.com/css?family=Varela+Round&display=swap");`
const theme = createMuiTheme({
  typography: {
    fontFamily: '\"Varela Round\"',
  },
})

const button = {
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0),
  marginRight: theme.spacing(4),
  marginLeft: theme.spacing(4),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  width: "80%",
  textTransform: 'none',
  boxShadow: 'none',
  color: "white",
  backgroundColor: "rgb(241, 95, 95)",
  '&:hover': {
    backgroundColor: 'rgb(242, 155, 155)',
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  title:{
    flexGrow: 1,
  },
  barButton: {
    borderWidth: "2px",
    fontWeight: "bold",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  left: {
    width:'40%',
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  topic: {
    paddingBottom: theme.spacing(4)
  },
  right: {
    width:'40%',
    flexGrow: 1,
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  loginTopic: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
    width: "70%",
  },
  buttonLoginTypeSelected: {
    backgroundColor: 'rgb(223, 223, 223)',
  },
  googleButton: {
    ...button,
    backgroundColor: "rgb(241, 95, 95)",
    '&:hover': {
      backgroundColor: 'rgb(242, 155, 155)',
    },
  },
  lineButton: {
    ...button,
    backgroundColor: "rgb(120, 219, 86)",
    '&:hover': {
      backgroundColor: 'rgb(170, 242, 155)',
    },
  },
  twitterButton: {
    ...button,
    backgroundColor: "rgb(95, 158, 241)",
    '&:hover': {
      backgroundColor: 'rgb(155, 200, 242)',
    },
  },
  textField: {
    width: "80%",
    marginTop: theme.spacing(2)
  },
  progress: {
    margin:'0 auto',
    marginTop: theme.spacing(18)
  },
  newRegisterButton: {
    marginTop: theme.spacing(4)
  }
}))

let isMounted = false

export default function Login(props) {
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleClickShowPassword(){
    setShowPassword(!showPassword)
  }
  function handleChange(e){
    setPassword(e.target.value)
  }

  const [loginType, setLoginType] = useState('SOCIAL_LOGIN')
  function handleLoginType(type){
    setLoginType(type)
  }

  const [isLoading, setIsLoading] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const doRedirect = () => setRedirect(true)

  useEffect(()=>{
    isMounted = true
    return () => {
      isMounted = false
    }
  }, [])

  onAuthStateChanged('Login', state => {
    if(state == 'SUCCESS'){
      doRedirect()
    }else if(state == 'WAITING'){
      setIsLoading(false)
      setIsWaiting(true)
    }else{
      setIsLoading(false)
      setIsWaiting(false)
    }
  })

  function handleNewRegister(){
    logout()
  }

  return (
    <div className={classes.root}>
      <SimpleAppBar />
      <GlobalStyle/>
      <main className={classes.content}>
        {
          isLoading ? (
            <div className={classes.main}>
              <CircularProgress className={classes.progress} />
              {redirect ? <Redirect to={(console.log(getPath('/main')),getPath('/main'))} /> : null}
            </div>
          ):(
            <MuiThemeProvider theme={theme}>
              <div className={classes.toolbar} />
              <div className={classes.main}>
                <div className={classes.left}>
                  <Typography variant="h3" className={classes.topic}>
                    Welcome<br/>to<br/>our service !
                  </Typography>
                  <Typography variant="body1">
                    Youtubeにアップロードされた動画を素早く検索することができます。このサービスは完全招待制のウェブサービスです。
                  </Typography>
                </div>
                <div className={classes.right}>
                  {
                    isWaiting ? (
                      <React.Fragment>
                        <Typography variant="h4" className={classes.loginTopic}>
                          LOG IN
                        </Typography>
                        <Typography variant="h6" className={classes.loginTopic}>
                          Waiting For Confirmation...
                        </Typography>
                        <Typography variant="body1" >
                          管理者からの承認待ちです。数日経っても承認されない場合、管理者に直接ご連絡ください。
                          <br/>
                          あなたのユーザID：{user.uid}
                        </Typography>
                        <Button variant="outlined" className={classes.newRegisterButton} onClick={handleNewRegister}>
                          新しいアカウントで申請
                        </Button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography variant="h4" className={classes.loginTopic}>
                          LOG IN
                        </Typography>
                        <ButtonGroup
                          className={classes.buttonGroup}
                          variant="outlined"
                          aria-label="large contained secondary button group"
                          size="small"
                          fullWidth
                        >
                          <Button className={loginType == 'SOCIAL_LOGIN' ? classes.buttonLoginTypeSelected : null} onClick={()=>handleLoginType('SOCIAL_LOGIN')}>Social Login</Button>
                          <Button disabled className={loginType == 'EMAIL_LOGIN' ? classes.buttonLoginTypeSelected : null} onClick={()=>handleLoginType('EMAIL_LOGIN')}>Email Login (comming soon)</Button>
                        </ButtonGroup>
                        {
                          loginType == 'SOCIAL_LOGIN' ? (
                            <div>
                              <Button variant="contained" className={classes.googleButton} onClick={loginGoogle}>
                                Googleでログイン
                              </Button>
                              <Button variant="contained" className={classes.lineButton} disabled>
                                LINEでログイン (comming soon)
                              </Button>
                              <Button variant="contained" className={classes.twitterButton} disabled>
                                Twitterでログイン (comming soon)
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <TextField
                                className={classes.textField}
                                label="Email"
                                id="margin-none"
                              />
                              <FormControl className={clsx(classes.margin, classes.textField)} margin="normal">
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input
                                  id="password"
                                  type={showPassword ? 'text' : 'password'}
                                  value={password}
                                  onChange={handleChange}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </div>
                          )
                        }
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
            </MuiThemeProvider>
          )
        }
      </main>
    </div>
  );
}
