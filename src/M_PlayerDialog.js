import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router-dom'
import useLockScroll from './useLockScroll.js';
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
import Drawer from 'react-drag-drawer'
import Typography from '@material-ui/core/Typography';

import GeneralButton from './GeneralButton.js'
import ShareDialog from './ShareDialog.js'
import Slider from './Slider.js';

import { getDisplayName } from './firebase/videoManager.js'
import { store } from './store.js'
import { push as pushWatchList } from './firebase/watchList.js'

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
  dialog:{
    padding: 0,
  },

  "@media screen and (orientation: landscape)":{
    modal:{
      background: "white",
      fontSize: "1.6rem",
      width: "90%",
      justifyContent: "space-between",
      zIndex: theme.zIndex.drawer,
      willChange: "transform",
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
      // marginTop: "calc(35px + env(safe-area-inset-top))",//"auto",
      marginLeft: "env(safe-area-inset-left)",//"auto",
      marginRight: "env(safe-area-inset-right)",//"auto",
      height: "100%",
      overflowY: "hidden",
      transform: "translate3d(0, 0, 0)",
    },
    reactPlayer:{
      position: 'fixed',
      maxHeight: "100%",
      top: 0,
      left: 0,
    },
  },
  "@media screen and (orientation: portrait)":{
    modal:{
      background: "white",
      fontSize: "1.6rem",
      width: "100%",
      justifyContent: "space-between",
      zIndex: theme.zIndex.drawer,
      willChange: "transform",
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
      marginTop: "calc(35px + env(safe-area-inset-top))",//"auto",
      marginLeft: "env(safe-area-inset-left)",//"auto",
      marginRight: "env(safe-area-inset-right)",//"auto",

      height: "99%",
      overflowY: "scroll",
      transform: "translate3d(0, 0, 0)",
    },
    reactPlayer:{
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
  playerWrapper:{
    position: "relative",
    paddingTop: "56.25%",
  },
  modalHandle:{
    position: "sticky",
    top: 0,
    background: "black",
    width: "auto",
    height: "2rem",
    zIndex: 20,
  },
  modalContainer:{
    position: "fixed",
    width: "100%",
    zIndex: theme.zIndex.modal
  },

  title: {
    color: "rgb(69,69,69)",
    marginBottom: 12,
    margin: theme.spacing(2),
  },
  description:{
    color: "rgb(69,69,69)",
    margin: theme.spacing(2),
  },

}));


// function useLockBodyScroll() {
//   const unlock = () => {
//     document.body.style.overflow = "visible"
//   }
//   const lock = () => {
//     document.body.style.overflow = 'hidden';
//   }
//   useLayoutEffect(() => {
//   //  lock()
//    return unlock
//   }, []); 
//   return [lock, unlock]
// }

export default withRouter(function PlayerDialog(props) {
  const classes = useStyles();

  const { open, favorite, handleFavorite, data, fullscreen:initFullscreen } = props
  const _handleClose = props.handleClose
  const [fullscreen, setFullscreen] = useState(initFullscreen)
  const [success, setSuccess] = useState(true)

  // const [lock, unlock] = useLockBodyScroll()
  const close = () => {
    // unlock()
    handleClose()
  }

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

  const [progress, setProgress] = useState(0)
  function handleProgress(x){
    setProgress(x.playedSeconds)
  }

  useLockScroll(open)

  //たっぷ処理
  const modal = useRef(null)
  const step = useRef(0.95)
  const dragStart = useRef(0)
  const handleTouchDown = e => {
    // lock()
    // modal.current.style.transitionDuration = 0
    // dragStart.current = e.changedTouches[0].pageY
  }
  const handleTouchMove = e =>{
  }
  const handleTouchUp = e => {
    // unlock()
    // if(e.changedTouches[0].pageY / window.outerHeight > 0.5){
    //   modal.current.style.transitionDuration = 200
    //   close()
    // }else{
      // step.current = 0.95
      // modal.current.style.transitionDuration = 200
    // }
    // modal.current.style.height = step.current
  }

  const onVideoStart = () => {
    pushWatchList(data.vid)
  }

  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  return (
      <Drawer
        className={classes.modal}
        open={open}
        direction='bottom'
        modalElementClass={classes.modal}
        containerElementClass={classes.modalContainer}
        // getModalRef={element => modal.current = element}
          // onTouchStart={handleTouchDown}
          // onTouchEnd={handleTouchUp}
          // onTouchCancel={handleTouchUp}
          // onTouchMove={handleTouchMove}
        onRequestClose={close}
        
        hideBackdrop
      >
        <div
          // className={classes.modalHandle}
          // onTouchStart={handleTouchDown}
          // onTouchEnd={handleTouchUp}
          // onTouchCancel={handleTouchUp}
          // onTouchMove={handleTouchMove}
        />
        <DialogContent className={classes.dialog}>
          {success ? (
            <div className={classes.playerWrapper}>
              <ReactPlayer
                className={classes.reactPlayer}
                url={props.url}
                width='100%'
                height='100%'
                playing
                controls
                loop
                pip
                onStart={onVideoStart}
                onError={handleAuthError}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: true,
                      start:0,
                    }
                  }
                }}
                onProgress={handleProgress}
              /> 
            </div>
          ):
            <DialogContentText className={classes.button}>
              Youtubeにログインしていないため動画を再生できません。
              <Button variant="outlined" className={classes.contentText} href="https://www.youtube.com">
                Youtubeへ移動
              </Button>
            </DialogContentText>
          }

          <Typography variant="h6" color="textSecondary" component="h4" className={classes.title}>
            {typeof(data.index) === 'number' ? `${data.index}. ${data.title}` : data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description} style={{whiteSpace: 'pre-line'}}>
            <strong>{` ${getDisplayName(data.category)}${data.year != null && (` (${data.year})`) || ''}${data.department != null && (' ' + data.department) || ''} ${data.day != null && (data.day + '日目') || ''}`}</strong>
            <strong>{`${data.affiliation != null && data.affiliation || ''}`}</strong>
            <br/>
            {data.description.replace(/\\n/g, '\n')}
          </Typography>
          <GeneralButton type="favorite" onClick={handleFavorite} value={favorite}/>
          <GeneralButton type="share" onClick={() => setShareDialogOpen(true)}/>
          <ShareDialog open={shareDialogOpen} setOpen={setShareDialogOpen} vid={data.vid}/>
        </DialogContent>
      </Drawer>
  )
})

//getAriaValueText={valuetext}
//marks={marks}
