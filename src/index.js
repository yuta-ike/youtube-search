import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({ 
  palette: {
    primary: {
      light: '#ffd46a',
      main: '#ffa339',
      dark: '#c77400',
      contrastText: '#000000',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
},
})


ReactDOM.render((
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
), document.getElementById('root'))
// ReactDOM.render(<script src="https://apis.google.com/js/api.js" type="text/javascript"></script>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
