import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectResponseCount, updateResponse } from '@/store/slices/responseSlice'
import { updateCurrentQuestionId, updateProgressBarState } from '@/store/slices/progressSlice'
import { Grid, Box } from '@material-ui/core'
import { animateTo, onEnterPressed } from '@/util'
import QuestionButton from '@/components/UI/Button/Question'
import { transitionDuration, colors } from '@/styles/theme'
import ClipBackground from '@/components/UI/ClipBackground'
import data from '@/data/index.json'
import { flatten } from 'lodash-es'
import Interstitial from '@/components/Template/Interstitial'
import { CSSTransition } from 'react-transition-group'
// import Swipe from '@/components/UI/Swipe'

const Question = (props) => {
  const { questionId, name, eyebrow, text, answer, next, section, interstitial } = props

  const dispatch = useDispatch()
  const history = useHistory()
  const responseCount = useSelector(selectResponseCount)
  const ref = useRef()
  const content = useRef()
  const card = useRef()
  const clipBackground = useRef()
  const btnsGroup = useRef()
  const notSureRef = useRef()

  const [clicked, setClicked] = useState(false)
  const [interstitialClicked, setInterstitialClicked] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(0) // 0 - no, 1 - somewhat, 2 - yes

  // index within section
  const sectionQuenstionIndex = Number(name.split('/').pop())
  // total question list
  const questions = flatten(data.map((section) => section.question))
  // question count within section
  const sectionQuestionTotal = questions.filter((d) => d.name.includes(section)).length

  useEffect(() => {
    // redirect
    if (responseCount + 1 < questionId) {
      history.push('/')
      dispatch(updateCurrentQuestionId(0))
      dispatch(updateProgressBarState(false))
    }
    // mount
    else {
      animateTo(ref.current, { opacity: 1 })
      animateTo(content.current, { transform: 'translateY(0)' })

      dispatch(updateCurrentQuestionId(questionId))

      // turn on progress bar
      dispatch(updateProgressBarState(true))
    }
  }, [])

  const no = () => {
    if (clicked) return
    setClicked(true)
    setSelectedAnswer(0)

    dispatch(
      updateResponse({
        section: section,
        questionId: questionId,
        questionText: text,
        ...answer[0]
      })
    )

    // if interstitial, hide progressbar right away
    if (interstitial) dispatch(updateProgressBarState(false))

    // animate card
    animateTo(
      card.current,
      { transform: 'rotate(-15deg) translateX(-100%) translateY(-50%)' },
      () => fadeOutAndDirect()
    )
    animateTo(card.current, { opacity: 0, duration: transitionDuration * 0.75 })

    // clip bg fade out
    animateTo(clipBackground.current, { opacity: 0, duration: transitionDuration * 0.5 })

    // bg color transition
    animateTo(ref.current, { backgroundColor: colors.grayscale[3], duration: transitionDuration })
    animateTo([btnsGroup.current, notSureRef.current], { opacity: 0 })

    /* analytics */
    taggingOnClick('No')
  }

  const somewhat = () => {
    if (clicked) return
    setClicked(true)
    setSelectedAnswer(1)

    dispatch(
      updateResponse({
        section: section,
        questionId: questionId,
        questionText: text,
        ...answer[1]
      })
    )

    // if interstitial, hide progressbar right away
    if (interstitial) dispatch(updateProgressBarState(false))

    // animate card
    animateTo(card.current, { transform: 'rotate(15deg) translateY(-100%)' }, () =>
      fadeOutAndDirect()
    )
    animateTo(card.current, { opacity: 0, duration: transitionDuration * 0.75 })

    // clip bg fade out
    animateTo(clipBackground.current, { opacity: 0, duration: transitionDuration * 0.5 })

    // bg color transition
    animateTo(ref.current, { backgroundColor: colors.webSafeGold, duration: transitionDuration })
    animateTo([btnsGroup.current, notSureRef.current], { opacity: 0 })

    /* analytics */
    taggingOnClick('Somewhat')
  }

  const yes = () => {
    if (clicked) return
    setClicked(true)
    setSelectedAnswer(2)

    dispatch(
      updateResponse({
        section: section,
        questionId: questionId,
        questionText: text,
        ...answer[2]
      })
    )

    // if interstitial, hide progressbar right away
    if (interstitial) dispatch(updateProgressBarState(false))

    // animate card
    animateTo(card.current, { transform: 'rotate(15deg) translateX(100%) translateY(-50%)' }, () =>
      fadeOutAndDirect()
    )
    animateTo(card.current, { opacity: 0, duration: transitionDuration * 0.75 })

    // clip bg fade out
    animateTo(clipBackground.current, { opacity: 0, duration: transitionDuration * 0.5 })

    // bg color transition
    animateTo(ref.current, { backgroundColor: colors.orange, duration: transitionDuration })
    animateTo([btnsGroup.current, notSureRef.current], { opacity: 0 })

    /* analytics */
    taggingOnClick('Yes')
  }

  const notSure = () => {
    if (clicked) return

    setClicked(true)
    setSelectedAnswer(0)

    dispatch(
      updateResponse({
        section: section,
        questionId: questionId,
        questionText: text,
        ...answer[0]
      })
    )

    // if interstitial, hide progressbar right away
    if (interstitial) dispatch(updateProgressBarState(false))

    // fade out content
    fadeOutAndDirect()

    // clip bg fade out
    animateTo([clipBackground.current, btnsGroup.current, notSureRef.current], { opacity: 0 })
  }

  const fadeOutAndDirect = () => {
    if (interstitial) {
      animateTo(content.current, { opacity: 0, display: 'none' }, () => {
        setShowInterstitial(true)
      })

      animateTo(ref.current, { backgroundColor: colors.lightBlue })
    } else {
      animateTo(ref.current, { opacity: 0 }, () => {
        history.push(next)
      })

      // turn off progress bar when last question
      if (sectionQuenstionIndex === sectionQuestionTotal) dispatch(updateProgressBarState(false))
    }
  }

  const onInterstitialComplete = () => {
    if (interstitialClicked) return
    setInterstitialClicked(true)

    animateTo(ref.current, { opacity: 0 }, () => {
      history.push(next)
    })
  }

  const taggingOnClick = (selection = '') => {
    _satellite.track('question-response', {
      subsection: section,
      ['question-number']: sectionQuenstionIndex,
      ['user-selection']: selection
    })
    console.log('tagging -------------------- question-response: ', {
      subsection: section,
      ['question-number']: sectionQuenstionIndex,
      ['user-selection']: selection
    })
  }

  return (
    <Grid
      ref={ref}
      className={`question gutter-outer ${showInterstitial ? 'interstitial-open' : ''}`}
      container
      item
      direction="row"
      justify="center"
      style={{ position: 'relative' }}>
      <div ref={clipBackground}>
        <ClipBackground />
      </div>

      {interstitial ? (
        <CSSTransition
          in={showInterstitial}
          timeout={transitionDuration * 1000}
          classNames="fade"
          unmountOnExit>
          <Interstitial
            onComplete={onInterstitialComplete}
            data={selectedAnswer === 2 ? interstitial[1] : interstitial[0]}
            answer={selectedAnswer}
            section={section}
          />
        </CSSTransition>
      ) : null}

      <Grid className="content-area" ref={content} item xs={12} sm={8} md={6}>
        <Box>
          {/* <Swipe swipedRight={yes} swipedLeft={no} swipedUp={somewhat}> */}
          <Grid container item spacing={1}>
            <Grid ref={card} item xs={12}>
              <Box className="card-question" bgcolor="#fff">
                <h4 role="heading" aria-level="1">
                  {eyebrow}
                </h4>
                <h2>{text}</h2>
              </Box>
            </Grid>

            <Grid container item style={{ paddingLeft: 0, paddingRight: 0 }} ref={btnsGroup}>
              <Grid item xs={4}>
                <QuestionButton text="No" onClick={no} />
              </Grid>
              <Grid item xs={4}>
                <QuestionButton text="Somewhat" onClick={somewhat} />
              </Grid>
              <Grid item xs={4}>
                <QuestionButton text="Yes" onClick={yes} />
              </Grid>
            </Grid>
          </Grid>
          {/* </Swipe> */}

          <Grid item xs={12} ref={notSureRef}>
            <Box mt={6} mb={5} style={{ textAlign: 'center' }}>
              <a
                className="not-sure"
                onClick={notSure}
                onKeyDown={(e) => onEnterPressed(e, notSure)}
                role="button"
                tabIndex="0">
                I'm not sure
              </a>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Question
