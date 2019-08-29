import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles'  // 追加
import { theme } from './thema.js'  // 追加


ReactDOM.render((
    <App />
), document.getElementById('root'))
// ReactDOM.render(<script src="https://apis.google.com/js/api.js" type="text/javascript"></script>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
