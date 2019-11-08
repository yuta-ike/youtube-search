import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ReactPlayer from 'react-player';

import ShareDialog from './ShareDialog.js'
import PlayerDialog from './PlayerDialog.js'
import GeneralButton from './GeneralButton.js'

import { addFavorite, removeFavorite } from './firebase/favorite.js'
import { getDisplayName } from './firebase/videoManager.js'
import { store, stop } from './store.js'
import { get as getThumbnail } from './firebase/thumbnail.js'

import user from './firebase/user.js'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  title: {
    color: 'black',
    marginBottom: 12,
  },
  iconButtonArea:{
    paddingTop: '0.1rem',
    paddingBottom: '0.1rem',
  },
  bottom:{
    display:'flex',
  },
  bottomButton:{
    height: '3rem',
    margin:'0 auto',
    textAlign:'center',
    paddingTop: '1em',
    fontWeight: 'bold',
  },
  bottomButtonContainer:{
    display: 'flex',
  },
}))

let initialized = false

export default function VideoCard(props){
  const classes = useStyles()
  const includePath = props.type === "INCLUDE-PATH"
  const data = props.data

  const duration = (() => {
    const minsec = data.duration.match(/^PT(?:(\d+)M)?(?:(\d+)S)?$/).slice(1,3)
    return `${minsec[0] != null ? minsec[0] : 0}:${(minsec[1] != null ? '0' + minsec[1] : '00').slice(-2)}`
  })()

  const [playerOpen, setPlayerOpen] = useState(props.playerOpen)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [favorite, setFavorite] = useState(props.favorite)

  let id
  if(!initialized){
    initialized = true
  }
  useEffect(() => () => {
    initialized = false
    stop(id)
  }, [])

  async function handleFavorite(){
    const response = (!favorite) ? await addFavorite(data.vid) : await removeFavorite(data.vid)
    if(response == false) return
    setFavorite(!favorite)
  }

  function handlePlayerOpen(){
    setPlayerOpen(true)
  }

  function handlePlayerClose(){
    setPlayerOpen(false)

    props.history.push('/main')
    store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
  }

  const loadImagePath = `${process.env.PUBLIC_URL}/load_image.png`
  const [thumbnailSrc, setThumbnailSrc] = useState(loadImagePath)
  getThumbnail(data.vid).then(setThumbnailSrc)

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia>
          <img src={thumbnailSrc}/>
        </CardMedia>
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="h2" className={classes.title}>
            {!includePath ? (
              typeof(data.index) === 'number' ? `${data.index}. ${data.title}` : data.title
            ):(
              data.title
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description} style={{whiteSpace: 'pre-line'}}>
            <strong>{` ${getDisplayName(data.category)}${data.year != null && (` (${data.year})`) || ''}${data.department != null && (' ' + data.department) || ''} ${data.day != null && (data.day + '日目') || ''}`}</strong>
            <br/>
            <strong>{`${data.affiliation != null && data.affiliation || ''}\n`}</strong>
            {data.description.replace(/\\n/g, '\n')}
            <br/>
          </Typography>
        </CardContent>
        <Divider />
        <div className={classes.bottom}>
          <CardActions disableSpacing>
            <GeneralButton type="favorite" onClick={handleFavorite} value={favorite}/>
            <GeneralButton type="share" onClick={() => setShareDialogOpen(true)}/>
            <ShareDialog open={shareDialogOpen} setOpen={setShareDialogOpen} vid={data.vid}/>
          </CardActions>
          <Divider />
          <CardActionArea className={classes.bottomButtonContainer} onClick={handlePlayerOpen}>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.bottomButton}>
              {'WATCH ' + '(' + duration + ")"}
            </Typography>
          </CardActionArea>
        </div>
      </Card>
      <PlayerDialog
        data={data}
        open={playerOpen}
        handleClose={handlePlayerClose}
        favorite={favorite}
        handleFavorite={handleFavorite}
        url={`https://www.youtube.com/watch?v=${data.vid}`}
        fullscreen={props.playerOpen}
      />
    </React.Fragment>
  )
}
