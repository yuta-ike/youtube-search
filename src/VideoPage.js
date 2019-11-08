import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import clsx from 'clsx';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

import GridPage from './Grid.js'
import VideoCard from './VideoCard.js'
import ProgressButton from './ProgressButton.js'
import MenuButton from './MenuButton.js'

import { store, observe, stop } from './store.js'
import { pageDataNext, pageDataBack } from './action.js'
import { isFavorite } from './firebase/favorite.js'
import { getVideo, getDisplayName, search } from './firebase/videoManager.js'
import { settings } from './firebase/user.js'

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

let initialized = false

export default withRouter(function VideoPage(props){
  const classes = useStyles()

  const [page, setPage] = useState([])
  const [cardType, setCardType] = useState('DEFAULT')
  const [hasAround, setHasAround] = useState({hasNext: false, hasBack: false})
  const [hierarchyList, setHierarchyList] = useState([])
  const [playerOpen, setPlayerOpen] = useState(false)

  useEffect(() => {
    const id1 = observe("PAGE_DATA", async content => {
      const { videos, hasNext } =
          await getVideo({
            conditions: content.conditions,
            searchType:content.searchType,
            page: content.page,
            size: settings.itemsPerRow * settings.itemsPerColumn,
            readNextPage: true
          })
      setPage(videos)
      setCardType(content.cardType)
      setHasAround({next: hasNext, back: content.page > 0})
      if(props.history.location.pathname !== '/main'){
        props.history.push('/main')
      }
    })
    const id2 = observe("PAGE_DATA_SEARCH", async content => {
      console.log(content)
      const { hits } =
          await search(content.query)
      setPage(hits)
      setCardType("INCLUDE-PATH")
      setHasAround({next: false, back: false})
      if(props.history.location.pathname !== '/main'){
        props.history.push('/main')
      }
    })
    const id3 = observe('BREADCRUMBS', arr => setHierarchyList(arr))

    if(props.vid != null){
      (async () => {
        setPage([await getVideo({vId: props.vid})])
        setCardType('INCLUDE-PATH')
        setHasAround({next: false, back: false})
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
        canClickNext={hasAround.next}
        canClickBack={hasAround.back}
        right={props.type === 'header' && (
          <IconButton aria-label="open setting" onClick={openPageSetting}>
            {open ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
          </IconButton>
        )}
      />
    )
  }

  function Settings(){
    return (
      <Box className={classes.paper} elevation={0}>
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={3}>
            <Typography className={classes.text} variant='body1'>
              {'Items per row : '}
              <MenuButton
                initValue={settings.itemsPerRow}
                choices={[1,2,3,4,5,6]}
              />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.text} variant='body1'>
              {'Items per column : '}
              <MenuButton
                initValue={settings.itemsPerColumn}
                choices={[1,2,3,4,8,16]}
              />
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.text} variant='body1'>
              {'Sort : '}
              <MenuButton
                initValue={settings.sort}
                choices={['番号順', 'チーム名順', '所属団体順', 'Youtubeプレイリスト再生順']}
              />
            </Typography>
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
        col={settings.itemsPerRow}
        row={Math.ceil(page.length / settings.itemsPerRow)}
      >
        {
          page.map(data =>
            <VideoCard
              key={data.vid}
              type={cardType}
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
