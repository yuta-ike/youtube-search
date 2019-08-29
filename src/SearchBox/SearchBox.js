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
    props.onChange(e)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="search (comming soon)"
          inputProps={{ 'aria-label': 'SearchVideos' }}
          value={word}
          disabled
          onChange={e => handleChange(e)}
        />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}



;
