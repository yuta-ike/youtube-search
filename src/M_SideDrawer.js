import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
// import Drawer from 'react-drag-drawer'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FolderHierarchy from './FolderHierarchy.js'
import mainFolderStructurePromise from './mainFolderStructure.js'
import subFolderStructure from './subFolderStructure.js'
import { store } from './store.js'
import { pageData } from './action.js'
import useLockScroll from './useLockScroll.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },

  //横向きでは非表示
  "@media screen and (orientation: landscape)":{
    modal:{
      display:"none",
    },
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  breadcrumbs: {
    paddingLeft: '32px',
    paddingTop: theme.spacing(2),
    marginBottom: '-12px'
  },
  modal:{
    fontSize: "1.6rem",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    zIndex: theme.zIndex.drawer,
    overflowY: "scroll",
  },
  // modalHandle:{
  //   position: "sticky",
  //   top: 0,
  //   background: "black",
  //   width: "auto",
  //   height: "2rem",
  //   zIndex: 20,
  // },
  drawerContent:{
    margin: theme.spacing(2),
    marginBottom: "40%"
  },
  dummy: {
    height: "1%",
  }
}));

export default function SideDrawer(props){
  const classes = useStyles();
  const { open, setOpen } = props

  const [mainFolderStructure, setMainFolderStructure] = useState([])
  mainFolderStructurePromise.then(value => setMainFolderStructure(value))
  const [selected, setSelected] = useState(null)

  const close = () => {
    setOpen(false)
  }

  const prevent = e => e.preventDefault
  useEffect(() => {
    document.addEventListener('touchmove', prevent , {passive:true})
  })


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <div className={classes.root}>
      <Drawer
        open={open}
        anchor='bottom'
        className={classes.modal}
        onClose={close}
        PaperProps={{
          style:{
            position: "fixed",
            height: "83%",
            margin: 0,
            marginLeft: "2.5%",
            marginRight: "2.5%",
            bottom: 0,
            borderRadius: "8px",
          },
        }}
      >
        <div className={classes.drawerContent}>
          <FolderHierarchy
            folderStructure={mainFolderStructure}
            onClickFile={(_, hierarchy) => {
              props.handleHierarchyList(hierarchy)
              store('PAGE_DATA', pageData(hierarchy, 'MAIN_FOLDER'))
              close()
              window.scrollTo(0, 0, "smooth")
              document.removeEventListener('touchmove', (e) => e.preventDefault, {passive:true})
            }}
            properties={{selected, setSelected}}
          />
        </div>
        <div className={classes.dummy}/>
      </Drawer>
    </div>
  )
}

