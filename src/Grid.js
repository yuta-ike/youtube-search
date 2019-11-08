import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function _Grid(props) {
  const classes = useStyles();
  function RowGrid(_props){
    return (
      <React.Fragment>
        {
          Array(props.col).fill().map((_, i) =>
            <Grid item xs={12} sm={6} md={3} key={i}>
              {props.children[_props.rowId * props.col + i]}
            </Grid>
          )
        }
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{ padding: 20 }}>
      <Grid container spacing={3}>
        {
          Array(props.row).fill().map((_, i) => (
            <Grid container spacing={2} style={{ padding: 5 }} key={i}>
              <RowGrid rowId={i}/>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}
