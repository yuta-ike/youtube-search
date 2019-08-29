import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FileCopy from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
});

export default function ShareDialog(props){
  const classes = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  function handleListItemClick(){
    props.setOpen(false)
  }

  function handleSnackBarClose(){
    setSnackBarOpen(false)
  }

  function handleCopy(){
    setSnackBarOpen(true)
  }

  function getUrl(){
    const path = window.location.href
    return path + `?vid=${props.vid}`
  }

  return (
    <React.Fragment>
      <Dialog aria-labelledby="simple-dialog-title" open={props.open} onClick={handleListItemClick}>
        <List>
          <CopyToClipboard text={getUrl()} onCopy={handleCopy}>
            <ListItem button onClick={handleListItemClick}>
              <ListItemIcon aria-label="copy to clipboard">
                <FileCopy/>
              </ListItemIcon>
              <ListItemText primary="この動画のURLをコピー" />
            </ListItem>
          </CopyToClipboard>
          <CopyToClipboard text={`https://www.youtube.com/watch?v=${props.vid}`} onCopy={handleCopy}>
            <ListItem button onClick={handleListItemClick}>
              <ListItemIcon aria-label="copy to clipboard">
                <FileCopy/>
              </ListItemIcon>
              <ListItemText primary="YoutubeのURLをコピー" />
            </ListItem>
          </CopyToClipboard>
        </List>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span id="message-id">クリップボードにコピーしました</span>}
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
}
