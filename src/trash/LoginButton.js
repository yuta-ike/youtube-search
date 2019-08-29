import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { loginGoogle, logoutGoogle, updateDb } from './firebase/index.js'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2),
    align:'right',
  },
  button: {
    margint: theme.spacing(1),
    textTransform: 'none',
    color: 'white'
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
    <div className={classes.root}>
      {
        loggedIn ? (
          <div>
            <Button className={classes.button} onClick={logout}>
              Logout
            </Button>
            <Button className={classes.button} onClick={() => updateDb(false)}>
              UpdateDB
            </Button>
            <Button className={classes.button} onClick={() => updateDb(true)}>
              UpdateDB(All)
            </Button>
          </div>
        ) : (
          <Button className={classes.button} onClick={login}>
            Login
          </Button>
        )
      }
    </div>
  )
}


;
