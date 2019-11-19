import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ShareDialog from './ShareDialog.js'
import PlayerDialog from './PlayerDialog.js'
import MPlayerDialog from './M_PlayerDialog.js'
import GeneralButton from './GeneralButton.js'

import { useLazy } from './customhooks.js'
import { addFavorite, removeFavorite } from './firebase/favorite.js'
import { getDisplayName } from './firebase/videoManager.js'
import { store, stop } from './store.js'
import { get as getThumbnail } from './firebase/thumbnail.js'
import { pushHistory } from './uriChecker.js'

const useStyles = makeStyles(theme => ({
  card: {
    margin:0,
    padding:theme.spacing(1),
    display: "flex",
    width: "100%",
  },
  title: {
    color: "black",
    marginBottom: 12,
  },
  description:{
    color: "rgb(20,20,20)",
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
  content:{
    background: "rgba(255,255,255,0.6)",
  },

  reactPlayer:{
    paddingBottom: theme.spacing(10)
  }
}))

export default withRouter(function VideoCard(props){
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

  async function handleFavorite(){
    const response = (!favorite) ? await addFavorite(data.vid) : await removeFavorite(data.vid)
    if(response == false) return
    setFavorite(!favorite)
  }

  const ref = useRef()
  function handlePlayerOpen(){
    setPlayerOpen(true)
  }

  function handlePlayerClose(){
    setPlayerOpen(false)

    pushHistory(props.history, '/main')
    store('MAIN_CONTENT', {type: 'MAIN_PAGE'})
  }

  const thumbnailSrc = useLazy(getThumbnail(data.vid), `${process.env.PUBLIC_URL}/load_image.png`)

  return (
    <React.Fragment>
      <Card className={classes.card} {...props.cardStyle} onClick={playerOpen ? handlePlayerClose : handlePlayerOpen}>
        <React.Fragment>
          <CardMedia style={{width:"60%"}}>
            <img src={thumbnailSrc}/>
          </CardMedia>
          <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary" component="h4" className={classes.title}>
              {!includePath ? (
                typeof(data.index) === 'number' ? `${data.index}. ${data.title}` : data.title
              ):(
                data.title
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.description} style={{whiteSpace: 'pre-line'}}>
              <strong>{` ${getDisplayName(data.category)}${data.year != null && (` (${data.year})`) || ''}${data.department != null && (' ' + data.department) || ''} ${data.day != null && (data.day + '日目') || ''}`}</strong>
              <br/>
              <strong>{`${data.affiliation != null && data.affiliation || ''}`}</strong>
              {data.description.replace(/\\n/g, '\n')}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <MPlayerDialog
        data={data}
        open={playerOpen}
        handleClose={handlePlayerClose}
        favorite={favorite}
        handleFavorite={handleFavorite}
        fullscreen={true}
        url={`https://www.youtube.com/watch?v=${data.vid}`}
      />
    </React.Fragment>
  )
})
