import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

import GridPage from './Grid.js'
import VideoCard from './VideoCard.js'
import ProgressButton from './ProgressButton.js'
import MenuButton from './MenuButton.js'

import { store, observe, stop } from './store.js'
import { pageDataNext, pageDataBack, pageDataRefresh } from './action.js'
import { isFavorite } from './firebase/favorite.js'
import { getVideo, getDisplayName, search } from './firebase/videoManager.js'
import { settings } from './firebase/user.js'

import useStateWithLocalStorage from './localStorageManager.js'

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    paddingLeft: '32px',
    paddingTop: theme.spacing(2),
    marginBottom: '-12px'
  },
  grid:{
    textAlign: 'center',
    justify: 'center',
  },
  text: {
    color: theme.palette.text.secondary,
  },
  paper: {
    background: 'rgba(0,0,0,0)',
    border: `solid 1px black`,
    borderRadius: "3px",
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

export default withRouter(function VideoPage(props){
  const classes = useStyles()

  const [content, setContent] = useState({videos: [], cardType: 'DEFAULT', hasNext: false, hasBack: false})
  const [hierarchyList, setHierarchyList] = useState([])
  const [playerOpen, setPlayerOpen] = useState(false)

  const [numOfItems, setNumOfItems] = useStateWithLocalStorage("NUM-Of-ITEMS-PER-PAGE", 24)
  const [orderBy, setOrderBy] = useStateWithLocalStorage("ORDER-BY", "index")

  useEffect(() => {
    const id1 = observe("PAGE_DATA", async content => {
      setContent(content)
      if(props.history.location.pathname !== '/main'){
        props.history.push('/main')
      }
    })
    const id2 = observe("PAGE_DATA_SEARCH", async content => {
      console.log(content)
      const { hits } = await search(content.query)
      setContent({videos: hits, cardType: 'INCLUDE-PATH', hasNext: false, hasBack: false})
      if(props.history.location.pathname !== '/main'){
        props.history.push('/main')
      }
    })
    const id3 = observe('BREADCRUMBS', arr => setHierarchyList(arr))

    if(props.vid != null){
      (async () => {
        setContent({videos: [await getVideo({vId: props.vid})], cardType: 'INCLUDE-PATH', hasNext: false, hasBack: false})
        setPlayerOpen(true)
      })()
    }
    return () => stop(id1, id2, id3)
  }, [])

  const [open, setOpen] = useState(false)

  function NavButton(props){
    async function next(){
      await store('PAGE_DATA', pageDataNext())
      window.scrollTo({top:0, left:0, behavior:"smooth"})
    }

    async function back(){
      await store('PAGE_DATA', pageDataBack())
      window.scrollTo({top:0, left:0, behavior:"smooth"})
    }

    function openPageSetting(){
      setOpen(!open)
    }

    return (
      <ProgressButton
        onClickNext={next}
        onClickBack={back}
        canClickNext={content.hasNext}
        canClickBack={content.hasBack}
        right={props.type === 'header' && (
          <IconButton aria-label="open setting" onClick={openPageSetting}>
            {open ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
          </IconButton>
        )}
      />
    )
  }

  function Settings(){
    const handleChange = key => choice => {
      if(key === 'NUM-Of-ITEMS-PER-PAGE') setNumOfItems(choice)
      else if(key === 'ORDER-BY') setOrderBy(choice)
    }

    const refresh = async () => {
      await store('PAGE_DATA', pageDataRefresh())
      window.scrollTo({top:0, left:0, behavior:"smooth"})
    }

    return (
      <Box className={classes.paper} elevation={0}>
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={4}>
            <Typography className={classes.text} variant='body1'>
              {'Items per page : '}
              <MenuButton
                initValue={numOfItems}
                choices={[8,12,24,48,"ALL"]}
                onChange={handleChange('NUM-Of-ITEMS-PER-PAGE')}
              />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.text} variant='body1'>
              {'Sort : '}
              <MenuButton
                initValue={orderBy}
                choices={[{label:'番号順', value:'index'}, {label:'チーム名順', value:'title'}]}
                onChange={handleChange('ORDER-BY')}
              />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button color="primary" variant="contained" onClick={refresh}>
              更新
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb" className={classes.breadcrumbs}>
        {
          Object.values(hierarchyList)
                .map(topic => getDisplayName(topic))
                .map(topic => <Typography key={topic}>{topic}</Typography>)
        }
      </Breadcrumbs>
      <NavButton type="header"/>
      {open && <Settings/>}
      <GridPage
        col={4}
        row={Math.ceil(content.videos.length / 4)}
      >
        {
          content.videos.map(data =>
            <VideoCard
              key={data.vid}
              type={content.cardType}
              data={data}
              favorite={isFavorite(data.vid)}
              playerOpen={playerOpen && props.vid === data.vid}
            />
          )
        }
      </GridPage>
      <NavButton />
    </React.Fragment>
  )
})
