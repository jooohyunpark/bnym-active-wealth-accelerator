import React, { useEffect } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import Question from '@/components/Template/Question'
import Intro from '@/components/Template/Intro'
import Result from '@/components/Template/Result'
import data from '@/data/index.json'
import { RedirectToHome, usePrevious, resetFocus } from '@/util'
import {
  selectCurrentSection,
  updateCurrentQuestionId,
  updateProgressBarState
} from '@/store/slices/progressSlice'
import { useSelector, useDispatch } from 'react-redux'
import { startCase } from 'lodash-es'

const Routes = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const currentSection = useSelector(selectCurrentSection)
  const previousSection = usePrevious(currentSection)

  useEffect(() => {
    // force to home on initial load
    if (history.action == 'POP' && location.pathname !== '/') {
      history.push('/')
      dispatch(updateCurrentQuestionId(0))
      dispatch(updateProgressBarState(false))
    }
  }, [])

  /* analytics */
  useEffect(() => {
    const pageTitle = document.querySelector('#pageTitle')

    if (location.pathname === '/') {
      digitalData = {
        page: {
          pageInfo: {
            pageName: 'Landing'
          }
        }
      }

      document.title = 'BNY Mellon Active Wealth Accelerator: Safeguard Your Legacy'
      pageTitle.textContent = 'BNY Mellon Active Wealth Accelerator: Safeguard Your Legacy'
    } else if (location.pathname === '/results') {
      // digital data will be updated in result component

      document.title = 'Results'
      pageTitle.textContent = 'Results'
    } else {
      digitalData = {
        page: {
          pageInfo: {
            pageName: startCase(location.pathname.replaceAll('/', ' ').trim())
          }
        }
      }

      document.title = startCase(location.pathname.replaceAll('/', ' ').trim())
      pageTitle.textContent = startCase(location.pathname.replaceAll('/', ' ').trim())
    }

    // reset focus for accessibility
    resetFocus()

    // scroll to top
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (currentSection) {
      // console.log('tagging --------------------start currentSection: ', currentSection)
      _satellite.track(currentSection, { status: 'start' })

      if (previousSection == null) {
        // console.log('tagging -------------------- process start')
        _satellite.track('process', { status: 'start' })
      }
    }

    if (previousSection) {
      _satellite.track(previousSection, { status: 'end' })
      // console.log('tagging --------------------end previousSection: ', previousSection)
    }
  }, [currentSection])
  /*  */

  return (
    <Switch>
      {/* INTRO */}
      {data.map((section, i) => {
        const introData = {
          ...section.intro,
          next: `/${section.question[0].name}`
        }
        return (
          <Route
            exact
            path={`/${section.intro.name}`}
            component={() => <Intro {...introData} />}
            key={'intro-' + i}
          />
        )
      })}

      {/* QUESTION */}
      {data.map((section, i) => {
        const sectionIndex = i

        return section.question.map((d, j) => {
          const questionIndex = j
          const questionData = {
            ...d,
            section: section.name,

            next:
              questionIndex === section.question.length - 1
                ? sectionIndex === data.length - 1
                  ? '/results'
                  : `/${data[sectionIndex + 1].intro.name}`
                : `/${section.question[questionIndex + 1].name}`
          }
          return (
            <Route
              exact
              path={`/${section.question[questionIndex].name}`}
              component={() => <Question {...questionData} />}
              key={'question-' + questionIndex}
            />
          )
        })
      })}

      <Route exact path="/results" component={Result} />
      <Route path="/" component={RedirectToHome} />
    </Switch>
  )
}

export default Routes
