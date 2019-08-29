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
            <Grid item xs={12/props.col} key={i}>
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
          Array(props.row).fill().map((_, i, arr) => (
            arr.length - i !== props.insertAtFromLast ? (
              <Grid container spacing={3} style={{ padding: 20 }} key={i}>
                <RowGrid rowId={i}/>
              </Grid>
            ):(
              <React.Fragment>
                <div key={i}>
                  <Grid container spacing={3} style={{ padding: 20 }} key={i}>
                    <RowGrid rowId={i}/>
                  </Grid>
                </div>
                {props.insertComponent}
              </React.Fragment>
            )
          ))
        }
      </Grid>
    </div>
  );
}
