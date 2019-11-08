import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const MySlider = withStyles({
  root: {
  },
  thumb: {
    height: 12,
    width: 12,
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -7,
  },
  valueLabel: {
    left: 'calc(-50% - 8px)',
  },

})(Slider)

const useStyles = makeStyles(theme => ({
  slider:{
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
}))

export default function VideoSlider(props){
  const classes = useStyles()

  const [values, setValues] = useState([0,0])
  function handleChange(e, newValues){
    setValues(newValues)
  }
  if(values[1] != props.progress){
    setValues([0, props.progress])
  }

  return (
    <MySlider
      className={classes.slider}
      aria-labelledby="discrete-slider-custom"
      min={0}
      max={300}
      value={values}
      valueLabelFormat={v=>`${Math.floor(v/120.)}:${('0'+Math.floor((v%120)/2)).slice(-2)}`}
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks={[{value:0, label:'0min'}, {value:120, label:'1min'}, {value:240, label:'2min'}, {value:360, label:'3min'}]}
    />
  )
}
