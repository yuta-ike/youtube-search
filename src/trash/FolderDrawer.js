import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function FolderDrawer(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
             className={classes.drawer}
             variant="permanent"
             classes={{
               paper: classes.drawerPaper,
             }}
           >
         <div className={classes.toolbar} />
         <List>
           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
             <ListItem button key={text}>
               <ListItemText primary={text} />
             </ListItem>
           ))}
         </List>
         <List>
           {['All mail', 'Trash', 'Spam'].map((text, index) => (
             <ListItem button key={text}>
               <ListItemText primary={text} />
             </ListItem>
           ))}
         </List>
      </Drawer>
    </div>
    )
}
