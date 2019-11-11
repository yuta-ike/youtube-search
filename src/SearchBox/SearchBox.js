import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="search videos"
          inputProps={{ 'aria-label': 'SearchVideos' }}
          value={word}
          onChange={e => handleChange(e)}
        />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}



;
