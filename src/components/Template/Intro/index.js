import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { Grid, Box, useMediaQuery } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentQuestionId, updateProgressBarState } from '@/store/slices/progressSlice'
import { selectResponseCount } from '@/store/slices/responseSlice'
import data from '@/data/index.json'
import { useHistory } from 'react-router-dom'
import { animateTo } from '@/util'
import ClipBackground from '@/components/UI/ClipBackground'
import { colors } from '@/styles/theme'
import NextButton from '@/components/UI/Button/Next'

const Intro = (props) => {
  const { introId, title, headline, text, bgImageSrc, bgImageAlt, next, name } = props

  const responseCount = useSelector(selectResponseCount)
  const dispatch = useDispatch()
  const history = useHistory()
  const ref = useRef()
  const titleRef = useRef()

  const above_md = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const above_sm = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const targetCount = data.reduce(
      (accumulator, currentValue, i) =>
        accumulator + currentValue.question.length * (introId - 1 <= i ? 0 : 1),
      0
    )

    // redirect
    if (responseCount + 1 < targetCount) {
      history.push('/')
      dispatch(updateCurrentQuestionId(0))
      dispatch(updateProgressBarState(false))
    }
    // mounted
    else {
      dispatch(updateProgressBarState(false))
      dispatch(updateCurrentQuestionId(targetCount + 1))

      animateTo(ref.current, { opacity: 1, display: 'flex' })
      animateTo(titleRef.current, {
        transform: 'translateX(0)',
        opacity: 1,
        duration: 1
      })
    }

    return () => {}
  }, [])

  const onClick = () => {
    if (clicked) return
    setClicked(true)

    animateTo(ref.current, { opacity: 0 }, () => history.push(next))
  }

  return (
    <Grid
      ref={ref}
      className="intro gutter-outer"
      id={'intro-' + introId}
      container
      item
      justify="center"
      style={{
        position: 'relative',
        display: 'none'
      }}>
      <ClipBackground src={bgImageSrc} alt={bgImageAlt} />

      <Grid container item className="intro-content">
        <Grid container item className="content-area">
          <Grid className="title-block" item xs={12} md={6} style={{ color: colors.white }}>
            <Box>
              <Grid container>
                {above_sm ? (
                  <Grid item sm={1} md={2} style={{ paddingTop: 0, paddingBottom: 0 }}></Grid>
                ) : null}
                <Grid item xs={12} sm={11} md={10} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <h1
                    ref={titleRef}
                    className="title"
                    style={{
                      transform: 'translateX(-40px)',
                      opacity: 0
                    }}>
                    {title}
                  </h1>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {above_md ? <Grid item xs={12} md={6}></Grid> : null}

          {above_md ? <Grid item xs={12} md={6}></Grid> : null}
          <Grid className="content-block" item xs={12} md={5}>
            <p className="bold">{headline}</p>
            <br />
            <p>{text}</p>
          </Grid>
        </Grid>

        <Grid item xs={12} className="button-area">
          <NextButton onClick={onClick} type="intro">
            {introId === 1 ? 'First question' : 'Next question'}
          </NextButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Intro
