import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { loginGoogle, logoutGoogle } from './firebase/index.js'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}))

export default function LoginButton(props){
  const classes = useStyles();
  const [loggedIn, setValue] = React.useState(false);

  async function login(){
    await loginGoogle()
    setValue(true)
  }

  async function logout(){
    await logoutGoogle()
    setValue(false)
  }

  return(
    <div>
      {
        loggedIn ? (
          <Button variant="contained" className={classes.button} onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" className={classes.button} onClick={login}>
            LogIn
          </Button>
        )
      }
    </div>
  )
}


;
