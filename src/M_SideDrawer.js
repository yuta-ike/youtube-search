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
    zIndex: theme.zIndex.drawer,
    willChange: "transform",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: "8px",
    marginTop: "auto",
    paddingBottom: 100,
    height: "80%",
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
    position: "fixed",
    width: "100%",
  }
}));

// function useLockBodyScroll() {
//   const unlock = () => {
//     document.body.style.overflow = "visible"
//   }
//   const lock = () => {
//     document.body.style.overflow = 'hidden';
//   }
//   useLayoutEffect(() => {
//    lock()
//    return unlock
//   }, []); 
//   return [lock, unlock]
// }

export default function SideDrawer(props){
  const classes = useStyles();
  const { open, setOpen } = props
  const [mainFolderStructure, setMainFolderStructure] = useState([])
  mainFolderStructurePromise.then(value => setMainFolderStructure(value))
  const [selected, setSelected] = useState(null)

  // const [lock, unlock] = useLockBodyScroll()
  const close = () => {
    setOpen(false)
  //   unlock()
  }


  //たっぷ処理
  // const modal = useRef(null)
  // const step = useRef("50%")
  // const dragStart = useRef(0)
  // const [dontApplyListeners, setDontApplyListeners] = useState(false)
  // useEffect(() => console.log(dontApplyListeners), [dontApplyListeners])
  const handleTouchDown = e => {
    // dragStart.current = e.changedTouches[0].pageY
    // setDontApplyListeners(false)
  }
  const handleTouchMove = e =>{
    // if(step.current === "50%"){
    //   const delta = Math.round(e.changedTouches[0].pageY - dragStart.current)
    //   modal.current.style.height = `calc(${step.current} - ${delta}px)`
    // }
  }
  const handleTouchUp = e => {
    // if(e.changedTouches[0].pageY / window.outerHeight > 0.6){
    //   close()
    // }else if(e.changedTouches[0].pageY / window.outerHeight > 0.3){
    //   step.current = "50%"
    // }else{
    //   step.current = "90%"
    // }
    // modal.current.style.height = step.current
    // setDontApplyListeners(true)
  }

  return (
    <div>
    <Drawer
      className={classes.modal}
      open={open}
      direction='bottom'
      modalElementClass={classes.modal}
      containerElementClass={classes.modalContainer}
      // getModalRef={element => modal.current = element}
      hideBackdrop
      onRequestClose={close}
      // allowClose={false}
      dontApplyListeners={true}
      width="100%"
    >
      {/* <div
        className={classes.modalHandle}
        onTouchStart={handleTouchDown}
        onTouchEnd={handleTouchUp}
        onTouchCancel={handleTouchUp}
        onTouchMove={handleTouchMove}
      /> */}
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

