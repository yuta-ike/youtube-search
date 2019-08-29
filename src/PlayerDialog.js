import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/CloseRounded';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import GeneralButton from './GeneralButton.js'
import ShareDialog from './ShareDialog.js'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  buttonsWrapper: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
});

const MyDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, fullscreen, onFullscreen, onFullscreenExit } = props;
  return (
    <DialogTitle disableTypography className={classes.root}>
      {children}
      <div className={classes.buttonsWrapper}>
        <IconButton aria-label="Close" className={classes.fullscreenButton} onClick={fullscreen ? onFullscreenExit : onFullscreen}>
          {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </DialogTitle>
  )
})

const useStyles = makeStyles(theme => ({
  buttonLiked:{
    margin: theme.spacing(1),
    textTransform: 'none',
    color:'rgb(255, 111, 158)',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  contentText:{
    flexGrow: 1,
  },
}));

export default withRouter(function PlayerDialog(props) {
  const classes = useStyles();

  const { open, favorite, handleFavorite, data, fullscreen:initFullscreen } = props
  const _handleClose = props.handleClose
  const [fullscreen, setFullscreen] = useState(initFullscreen)
  const [success, setSuccess] = useState(true)


  // props.history.push(`/main?vid=${data.vid}`)
  function handleClose() {
    _handleClose()
    setFullscreen(false)
  }

  function handleFullscreen(){
    setFullscreen(true)
  }

  function handleFullscreenExit(){
    setFullscreen(false)
  }

  function handleAuthError(){
    setSuccess(false)
  }

  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  return (
      <Dialog
        fullWidth
        fullScreen={fullscreen}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{style:{height:'100%'}}}
      >
        <MyDialogTitle id="max-width-dialog-title"
          {...{fullscreen, onFullscreen:handleFullscreen, onFullscreenExit:handleFullscreenExit, onClose:handleClose}}
        >
          {data.title}
        </MyDialogTitle>
        <DialogContent className={classes.dialog}>
          {success ?
            <ReactPlayer
              className={classes.reactPlayer}
              url={props.url}
              width='100%'
              height='100%'
              playing
              controls
              loop
              onError={handleAuthError}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: true,
                    start:0,
                  }
                }
              }}
            /> :
            <DialogContentText className={classes.button}>
              Youtubeにログインしていないため動画を再生できません。
              <Button variant="outlined" className={classes.contentText} href="https://www.youtube.com">
                Youtubeへ移動
              </Button>
            </DialogContentText>
          }
        </DialogContent>
        {!fullscreen &&
          <DialogActions disableSpacing>
            <GeneralButton type="favorite" onClick={handleFavorite} value={favorite}/>
            <GeneralButton type="share" onClick={() => setShareDialogOpen(true)}/>

            <ShareDialog open={shareDialogOpen} setOpen={setShareDialogOpen} vid={data.vid}/>
          </DialogActions>
        }
      </Dialog>
  )
})
