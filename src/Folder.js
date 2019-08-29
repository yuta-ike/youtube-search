import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import FolderIcon from '@material-ui/icons/Folder';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(2),
  },
}))

export default function Folder(props){
  const classes = useStyles();
  const [open, setOpen] = useState();

  function handleFolderClick(){
      setOpen(!open)
      if(props.onClick != null) props.onClick()
  }

  function handleFileClick(e){
      setOpen(!open)
      if(props.onClick != null) props.onClick()
  }

  if(props.children != null){
    return (
      <div>
        <ListItem button key={props.name} onClick={handleFolderClick}>
          <ListItemIcon>
            {props.icon ? props.icon : <FolderIcon/>}
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(Array.isArray(props.children) ? props.children : [props.children])
              .map(child => (
                <div className={classes.nested} key={child.props.name}>
                  {child}
                </div>
             ))}
          </List>
        </Collapse>
      </div>
    )
  }else{
    return (
      <ListItem button key={props.name} onClick={handleFileClick}>
        <ListItemIcon>
          {props.icon ? <props.icon /> : <FolderOpenIcon />}
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    )
  }
}
