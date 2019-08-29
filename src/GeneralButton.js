import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  button:{
    fontSize: '20px',
  },
  buttonLiked:{
    fontSize: '20px',
    color:'rgb(255, 111, 158)',
  },
}))

export default function GeneralButton(props){
  const classes = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  if(props.type === 'favorite'){
    function handleSnackBarClose(){
      setSnackBarOpen(false)
    }

    function handleClick(){
      props.onClick()
      setTimeout(() => setSnackBarOpen(true), 300)
    }

    return (
      <React.Fragment>
        <Tooltip title={props.value ? 'お気に入りから削除' : 'お気に入りに追加'} enterDelay={500}>
          <IconButton aria-label="Add to favorites" onClick={handleClick}>
            {
              props.value ?
                <FavoriteIcon className={classes.buttonLiked} />
              :
                <FavoriteBorderIcon className={classes.button} />
            }
          </IconButton>
        </Tooltip>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackBarOpen}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          TransitionComponent={Slide}
          message={
            <span id="message-id">{props.value ? 'お気に入りに追加しました' : 'お気に入りから削除しました'}</span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  }else if(props.type === 'share'){
    return (
      <Tooltip title="共有方法を選択" enterDelay={500}>
        <IconButton aria-label="Share" onClick={props.onClick}>
          <ShareIcon className={classes.button}/>
        </IconButton>
      </Tooltip>
    )
  }
}
