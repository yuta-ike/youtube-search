import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getInfo } from './firebase/info.js'

const useStyles = makeStyles(theme => ({
  title: {
    color: 'black',
    margin: theme.spacing(4),
  },
  body:{
    color: 'black',
    marginLeft: theme.spacing(6),
  },
  table:{
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(6),
  }
}))

export default function Information(){
  const classes = useStyles()

  const [info, setInfo] = useState([])
  useEffect(() => {
    getInfo().then(_info => setInfo(_info))
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h4" color="textSecondary" component="h1" className={classes.title}>
        このサービスについて
      </Typography>

      <Typography variant="h5" color="textSecondary" component="h2" className={classes.title}>
        現在のバージョン
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p" className={classes.body}>
        1.1
      </Typography>

      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>作成者</TableCell>
            <TableCell>内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            info.map(({date, generator, message}, index) => (
              <TableRow key={index}>
                <TableCell className={classes.cell}>{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}</TableCell>
                <TableCell className={classes.cell}>{generator}</TableCell>
                <TableCell className={classes.cell}>{message}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
