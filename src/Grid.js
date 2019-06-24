import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const col = 3
const row = 3

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function App(props) {

  const classes = useStyles();
  function RowGrid(_props){
    return (
      <React.Fragment>
        {
          Array(col).fill().map((_, i) =>
            <Grid item xs={4} key={i}>
              {props.children[_props.rowId * row + i]}
            </Grid>
          )
        }
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid container spacing={3} style={{ padding: 20 }}>
          <RowGrid rowId={0}/>
        </Grid>
        <Grid container spacing={3} style={{ padding: 20 }}>
          <RowGrid rowId={1}/>
        </Grid>
        <Grid container spacing={3} style={{ padding: 20 }}>
          <RowGrid rowId={2}/>
        </Grid>
      </Grid>
    </div>
  );
}
