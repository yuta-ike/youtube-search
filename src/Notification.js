import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { getInfo } from './firebase/info.js'

const useStyles = makeStyles(theme => ({
  cell: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

  },
}))

export default function Notification(){
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenu(){
    setAnchorEl(null);
  }

  const [info, setInfo] = useState([])
  useEffect(() => {
    getInfo(10).then(_info => setInfo(_info))
  }, [])

  return (
    <React.Fragment>
      <IconButton
        aria-label="notifications"
        color="inherit"
        onClick={handleClick}
      >
        {/*<Badge badgeContent={1} color="secondary">*/}
          <NotificationsIcon />
        {/*</Badge>*/}
      </IconButton>
      <Popover
        id="notifications"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenu}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
      >
      <Table className={classes.table} size="small">
        <TableBody>
          {
            info.map(({date, generator, message}, index) => (
              <TableRow key={index}>
                <TableCell className={classes.cell}>{`${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`}</TableCell>
                <TableCell className={classes.cell}>{generator}</TableCell>
                <TableCell className={classes.cell}>{message}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      </Popover>
    </React.Fragment>
  )
}
