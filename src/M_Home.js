import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecialOutlined';
import IconButton from '@material-ui/core/IconButton';
import RowAppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import GetAppIcon from '@material-ui/icons/GetApp';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import clsx from 'clsx';
import { pageDataSearch } from './action.js';
import ExtensionButton from './ExtensionButton.js';
import { getName, onAuthStateChanged } from './firebase/auth.js';
import Help from './Help.js';
import Information from './Information.js';
import ManagementPortal from './ManagementPortal.js';
import AppBar from './M_AppBar.js';
import SideDrawer from './M_SideDrawer.js';
import VideoPage from './M_VideoPage.js';
import NotificationButton from './Notification.js';
import NotifyPortal from './NotifyPortal.js';
import SettingsPage from './SettingsPage.js';
import SearchBox from './SearchBox/SearchBoxInPage.js'

import { observe, store } from './store.js';
import { pageData } from './action.js'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  alert: {
    display:"none",
  },

  //横向きでは非表示
  "@media screen and (orientation: landscape)":{
    root:{
      display:"none",
    },
    alert: {
      display:"flex",
    },
  },

  content: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    paddingBottom: "22%", // 調整値
  },
  uname: {
    paddingLeft: theme.spacing(2),
  },
  searchbox:{
    top: 0,
    bottom: "auto",
    width: "100%",
  },
  icon: {
    fontSize: "1.8rem"
  }
}));

let initialized = false
let first = true

export default function Home(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    first && setOpen(true)
    first = false
  })
  const [mainContent, setMainContent] = useState("")

  if(!initialized){
    observe('MAIN_CONTENT', value => {
      setMainContent(value)
      if(value.type != 'MAIN_PAGE'){
        setOpen(false)
        setSearchMode(false)
      }
    })
    //初期化
    const type = props.match.params.pagetype
    if(type === 'main'){
      const vid = (props.location.search.match(/^\?vid=(?<vid>.+)$/) || {groups:{}}).groups.vid
      if(vid != null){
        store('MAIN_CONTENT', {type: 'MAIN_PAGE', params: {vid}})
      }else{
        store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
      }
    }else{
      store('MAIN_CONTENT', type != null ? {type} : {type: 'MAIN_PAGE'})
    }
    initialized = true
  }


  function handleHierarchyList(arr){
    store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
    store('BREADCRUMBS',arr)
  }

  function handleFolderOpen(){
    setOpen(!open)
    if(!open) setSearchMode(false)
    
  }

  const [name, setName] = useState(getName())
  onAuthStateChanged('Home', (state, user) => {
    if(state == 'SUCCESS'){
      setName(user.uname)
    }
  })  

  let timer
  async function handleSearchBox(word){
    clearTimeout(timer)
    if(word !== ''){
      timer = setTimeout(() => {
        store('PAGE_DATA', pageDataSearch(word))
      }, 500)
    }
  }

  //ここ共通化する
  const handleClickMenuItem = key => () => {
    handleHierarchyList({category:key})
    store('PAGE_DATA', pageData({category: key}, 'SUB_FOLDER'))
    window.scrollTo(0, 0, "smooth")
    setOpen(false)
    setSearchMode(false)
  }

  const [searchMode, setSearchMode] = useState(false)
  const handleClickSearch = () => {
    store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
    setSearchMode(!searchMode)
    setOpen(false)
  }

  //DEVELOPでは実行しない
  if(process.env.NODE_ENV != 'development'){
    if(!window.matchMedia('(display-mode: standalone)').matches){
      return (
        <Dialog open={true}>
          <DialogContent>
            <DialogContentText>
              ホーム画面に追加してください
            </DialogContentText>
            <div style={{textAlign: 'center',justify: 'center',padding: "8px"}}>
              <GetAppIcon style={{fontSize: "80px"}}/>
            </div>
            <DialogContentText>
              iOSは下部の共有ボタンから「ホーム画面に追加」を選択
              <br/><br/>
              Androidは下部メッセージから「ホーム画面に追加」をタップ
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }
  }
  return (
    <React.Fragment>
      <Dialog className={classes.alert} open={true}>
        <DialogContent>
          <DialogContentText>
            デバイスの回転を縦に戻してください
          </DialogContentText>
          <div style={{textAlign: 'center',justify: 'center',padding: "8px"}}>
            <ScreenRotationIcon style={{fontSize: "80px"}}/>
          </div>
        </DialogContent>
      </Dialog>
      <div className={classes.root}>
        <SideDrawer className={classes.drawer} open={open} setOpen={setOpen} handleHierarchyList={handleHierarchyList}/>
        {searchMode && (
          <SearchBox autoFocus className={classes.searchbox} onChange={handleSearchBox} onClick={handleSearchBox} onClose={handleClickSearch}/>
        )}
        
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          {
            mainContent.type == "MAIN_PAGE" ?
              <VideoPage {...(mainContent.params || {})}/>
            :
            mainContent.type == 'managementportal' ?
              <ManagementPortal />
            :
            mainContent.type == 'notifyportal' ?
              <NotifyPortal />
            :
            mainContent.type == 'settings' ?
              <SettingsPage />
            :
            mainContent.type == 'help' ?
              <Help />
            :
            mainContent.type == 'information' ?
              <Information />
            :
            null
          }
        </main>
        <AppBar
          onClickCenter={handleFolderOpen}
          right={
            <React.Fragment>
              <ExtensionButton modalDirection="top"/>
              <IconButton
                color="inherit"
                onClick={handleClickMenuItem("history")}
                style={{margin: '0 5px'}}
              >
                <HistoryIcon className={classes.icon}/>
               </IconButton>
              </React.Fragment>
          }
          left={
            <React.Fragment>
              <IconButton
                color="inherit"
                onClick={handleClickMenuItem("favorite")}
                style={{margin: '0 5px'}}
              >
                <FolderSpecialIcon className={classes.icon}/>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleClickSearch}
                style={{margin: '0 5px'}}
              >
                <SearchIcon className={classes.icon}/>
              </IconButton>
            </React.Fragment>
          }
        /> 
      </div>
    </React.Fragment>
  );
}
