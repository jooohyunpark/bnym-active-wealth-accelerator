import React from 'react'
import './index.scss'
import {
  selectCurrentQuestionId,
  selectCurrentSection,
  selectProgressBarState
} from '@/store/slices/progressSlice'
import { withStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { Grid, LinearProgress, Box } from '@material-ui/core'
import data from '@/data/index.json'
import { upperCase } from 'lodash-es'
import { CSSTransition } from 'react-transition-group'
import { headerHeight, colors, transitionDuration } from '@/styles/theme'

// const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

const ProgressBar = withStyles((theme) => ({
  root: {
    height: 4,
    marginBottom: 8
  },
  colorPrimary: {
    backgroundColor: theme.palette.type === 'light' ? '#fff' : '#000'
  },
  bar: {
    backgroundColor: colors.orange,
    transition: `all ${transitionDuration}s linear`
  }
}))(LinearProgress)

const Progress = () => {
  const currentQuestionId = useSelector(selectCurrentQuestionId)
  const currentSection = useSelector(selectCurrentSection)
  const progressBarState = useSelector(selectProgressBarState)

  return (
    <CSSTransition
      in={progressBarState}
      timeout={transitionDuration * 1000}
      classNames="fade"
      unmountOnExit>
      <Grid
        className="progress gutter-outer"
        container
        item
        justify="center"
        style={{
          position: 'absolute',
          left: 0,
          top: headerHeight,
          paddingBottom: 0,
          paddingTop: 0
        }}>
        <Grid item xs={12} sm={8} md={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Box
            className="progress-bar-container"
            role="group"
            display="flex"
            aria-label="questionnaire progress indicator">
            {data.map((section, i) => {
              const previousQuestionSum = data.reduce(
                (accumulator, currentValue, j) =>
                  accumulator + currentValue.question.length * (j < i ? 1 : 0),
                0
              )
              const progress = Math.max(
                Math.min(
                  ((currentQuestionId - previousQuestionSum) / section.question.length) * 100,
                  100
                ),
                0
              )

              return (
                <Box width={`${100 / data.length}%`} mr={'4px'} key={i}>
                  <ProgressBar
                    variant="determinate"
                    value={progress}
                    // value={mapRange(progress, 0, 100, -1, 100)}
                    aria-label={`${section.name} section progress bar`}
                    aria-hidden={section.name === currentSection ? false : true}
                    className={
                      section.name === currentSection ? 'progress-bar' : 'progress-bar inactive'
                    }
                  />

                  <label
                    className={section.name === currentSection ? '' : 'inactive'}
                    aria-hidden="true">
                    {upperCase(section.name)}
                  </label>
                </Box>
              )
            })}
          </Box>
        </Grid>
      </Grid>
    </CSSTransition>
  )
}

export default Progress
