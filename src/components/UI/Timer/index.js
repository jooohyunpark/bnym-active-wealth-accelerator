import React, { useEffect, useState, useRef } from 'react'
import { LinearProgress, Grid, Box, withStyles } from '@material-ui/core'
import theme, { headerHeight, colors } from '@/styles/theme'
import gsap from 'gsap'
import './index.scss'

const TimerBar = withStyles((theme) => ({
  root: {
    height: 4,
    marginBottom: 8
  },
  bar: {
    transition: 'transform 0.1s linear'
  }
}))(LinearProgress)

const Timer = (props) => {
  const { duration = 15, onComplete = () => {}, type = 'light' } = props

  const ref = useRef()

  const [progress, setProgress] = useState(0)

  const time = {
    value: 0
  }

  useEffect(() => {
    const timer = gsap.to(time, {
      value: duration,
      duration: duration,
      ease: 'none',
      onUpdate: () => {
        setProgress((time.value / duration) * 100)
      },
      onComplete: () => {
        onComplete()
      }
    })

    timer.play()

    return () => {
      timer.kill()
    }
  }, [])

  return (
    <Grid
      className={`timer gutter-outer ${type}`}
      container
      item
      alignItems="center"
      justify="center"
      style={{
        position: 'absolute',
        left: 0,
        top: headerHeight,
        width: '100%',
        paddingBottom: 0,
        paddingTop: 0,
        marginRight: 0,
        marginLeft: 0
      }}>
      <Grid item xs={12} sm={8} md={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Box className="timer-bar-container" display="flex">
          <Box width={1}>
            <TimerBar ref={ref} variant="determinate" value={progress} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Timer
