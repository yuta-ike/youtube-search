import React from 'react';
import posed from 'react-pose';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function _Grid(props) {
  const classes = useStyles();
  const { children: _children } = props
  const children = [..._children]

  return (
    <div className={classes.root} style={{ padding: 0 }}>
      <Grid className={classes.grid} container spacing={1}>
      {
        Array(children.length).fill().map(() => {
          const child = children.shift()
          return (
            <Grid item xs={12} sm={6} md={3} key={child.key}>
              {child}
            </Grid>
          )
        })
      }
      </Grid>
    </div>
  );
}
