import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SearchBox from './SearchBox/SearchBoxInMenuBar.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <SearchBox onChange={props.onChange}/>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Search" />
          <Tab label="Favorite" />
          <Tab label="Edit" />
        </Tabs>

      </AppBar>
      {value === 0 && props.children}
      {value === 1 && props.children}
      {value === 2 && props.children}
    </div>
  );
}
