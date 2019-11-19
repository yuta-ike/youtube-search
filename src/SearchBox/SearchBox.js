import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseRounded';

export default (useStyles) => function Search(props){
  const classes = useStyles();
  const [word, setWord] = useState("")

  function handleChange(e){
    setWord(e.target.value)
    props.onChange(e.target.value)
  }

  function handleClick(){
   props.onClick(word)
  }

  function handleClose(){
    props.onClose && props.onClose()
    setWord("")
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="search videos"
          inputProps={{ 'aria-label': 'SearchVideos' }}
          value={word}
          onChange={handleChange}
          autoFocus={props.autoFocus}
        />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Paper>
    </div>
  )
}



;
