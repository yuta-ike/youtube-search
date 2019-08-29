import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from 'react-waypoint'
import { withRouter } from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from './Grid.js'
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import VideoCard from './VideoCard.js';

import { store, observe, stop } from './store.js'
import { pageData, morePageData } from './action.js'
import { isFavorite } from './firebase/favorite.js'
import { searchVideoWithVid, inverseCategoriesTable } from './firebase/videoManager.js'

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    paddingLeft: '32px',
    paddingTop: theme.spacing(2),
    marginBottom: '-12px'
  },
}));

let initialized = false

export default withRouter(function VideoPage(props){
  const classes = useStyles();

  const [page, setPage] = useState({type:"DEFAULT",content:[]})
  const [hierarchyList, setHierarchyList] = useState([])
  let id1, id2
  const [playerOpen, setPlayerOpen] = useState(false)
  if(!initialized){
    id1 = observe("PAGE_UPDATE", pageData => {
      setPage(pageData.payload)
      props.history.push('/main')
    })
    id2 = observe('BREADCRUMBS', arr => setHierarchyList(arr))
    if(props.vid != null){
      (async () => {
        setPage({
          videocardType: "INCLUDE_PTAH",
          content: [await searchVideoWithVid(props.vid)],
        })
        setPlayerOpen(true)
      })()
    }
    initialized = true
  }

  useEffect(() => () => {
    initialized = false
    stop(id1, id2)
  }, [])

  return (
    <React.Fragment>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb" className={classes.breadcrumbs}>
        {
          Object.values(hierarchyList)
                .map(topic => inverseCategoriesTable[topic] != null ? inverseCategoriesTable[topic] : topic)
                .map(topic => <Typography key={topic}>{topic}</Typography>)
        }
      </Breadcrumbs>
      <Grid
        col={4}
        row={Math.ceil(page.content.length / 4)}
        insertAtFromLast={3}
        insertComponent={
          <Waypoint onEnter={async () => {
            store('PAGE_UPDATE', await morePageData(24))
            store('BREADCRUMBS',hierarchyList)
          }} />
        }
      >
        {
          page.content.map(data =>
            <VideoCard
              key={data.vid}
              type={page.videocardType}
              data={data}
              favorite={isFavorite(data.vid)}
              playerOpen={playerOpen && props.vid === data.vid}
            />
          )
        }
      </Grid>
    </React.Fragment>
  )
})
