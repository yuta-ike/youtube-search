import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  menuItem: {
    textAlign: 'center',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  button: {
    textTransform: 'none',
  },
}))

export default function MenuButton(props){
  const classes = useStyles();
  const { initValue, choices, handleSelect = ()=>{} } = props

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [value, setValue] = useState(initValue)

  function handleClose(e){
    setAnchorEl(null)
    setValue(e.currentTarget.innerText || value)
  }

  function handleClick(e) {
    setAnchorEl(e.currentTarget)
  }

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={handleClick}>
        {value}
        <ArrowDropDownIcon/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      {
        choices.map(choice => <MenuItem className={classes.menuItem} onClick={handleClose} key={choice}>{choice}</MenuItem>)
      }
      </Menu>
    </React.Fragment>
  )
}
