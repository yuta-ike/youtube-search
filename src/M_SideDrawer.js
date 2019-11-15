import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from 'react-drag-drawer'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import FolderHierarchy from './FolderHierarchy.js'
import mainFolderStructurePromise from './mainFolderStructure.js'
import subFolderStructure from './subFolderStructure.js'
import { store } from './store.js'
import { pageData } from './action.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    background: "white",
    fontSize: "1.6rem",
    width: "97%",
    justifyContent: "space-between",
    zIndex: 15,
    willChange: "transform",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: "8px",
    marginTop: "auto",
    
    height: "50%",
    overflowY: "scroll",
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
    position: "absolute",
    width: "100%",
  }
}));

function useLockBodyScroll() {
  const unlock = () => {
    document.body.style.overflow = "visible"
  }
  useLayoutEffect(() => {
  //  originalStyle = window.getComputedStyle(document.body).overflow;
   document.body.style.overflow = 'hidden';
   return unlock
  }, []); 
  return unlock
}

export default function SideDrawer(props){
  const classes = useStyles();
  const { open, setOpen } = props
  const [mainFolderStructure, setMainFolderStructure] = useState([])
  mainFolderStructurePromise.then(value => setMainFolderStructure(value))
  const [selected, setSelected] = useState(null)

  // const unlock = useLockBodyScroll()
  const close = () => {
    setOpen(false)
  //   unlock()
  }


  //たっぷ処理
  const modal = useRef(null)
  const step = useRef("50%")
  const dragStart = useRef(0)
  const handleTouchDown = e => {
    modal.current.style.transitionDuration = 0
    dragStart.current = e.changedTouches[0].pageY
  }
  const handleTouchMove = e =>{
    const delta = Math.round(e.changedTouches[0].pageY - dragStart.current)
    modal.current.style.height = `calc(${step.current} - ${delta}px)`
  }
  const handleTouchUp = e => {
    // console.log(e.changedTouches[0].pageY/window.outerHeight)
    if(e.changedTouches[0].pageY / window.outerHeight > 0.6){
      modal.current.style.transitionDuration = 200
      close()
    }else if(e.changedTouches[0].pageY / window.outerHeight > 0.3){
      modal.current.style.transitionDuration = 200
      step.current = "50%"
    }else{
      step.current = "95%"
      modal.current.style.transitionDuration = 200
    }
    modal.current.style.height = step.current
  }

  return (
    <div>
    <Drawer
      className={classes.modal}
      open={open}
      direction='bottom'
      modalElementClass={classes.modal}
      containerElementClass={classes.modalContainer}
      getModalRef={element => modal.current = element}
      hideBackdrop
      width="100%"
    >
      <div
        className={classes.modalHandle}
        onTouchStart={handleTouchDown}
        onTouchEnd={handleTouchUp}
        onTouchCancel={handleTouchUp}
        onTouchMove={handleTouchMove}
      />
      <FolderHierarchy
        folderStructure={subFolderStructure}
        onClickFile={(_, hierarchy) =>{
          props.handleHierarchyList(hierarchy)
          store('PAGE_DATA', pageData(hierarchy, 'SUB_FOLDER'))
          close()
          window.scrollTo(0, 0, "smooth")
        }}
        properties={{selected, setSelected}}
      />
      <Divider />
      <FolderHierarchy
        folderStructure={mainFolderStructure}
        onClickFile={(_, hierarchy) => {
          props.handleHierarchyList(hierarchy)
          store('PAGE_DATA', pageData(hierarchy, 'MAIN_FOLDER'))
          setOpen(false)
          window.scrollTo(0, 0, "smooth")
        }}
        properties={{selected, setSelected}}
      />
    </Drawer>
    </div>
  )
}

