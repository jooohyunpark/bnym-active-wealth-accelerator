import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useLocation } from 'react-router-dom'
import { animateTo, staggerFromTo } from '@/util'
import './index.scss'
import gsap from 'gsap'
import ClipBackground from '@/components/UI/ClipBackground'
import NextButton from '@/components/UI/Button/Next'
import Header from '@/components/UI/Header/Landing'
import { PROJECT_PATH } from '@/data'
import data from '@/data/index.json'

const landingPage = document.querySelector('.landing')

/* background */
ReactDOM.render(
  <ClipBackground
    src="assets/img/aw_landing.jpg"
    alt="A long line of windmills curving around a hilltop at sunset."
    view="landing"
  />,
  landingPage.querySelector('.background')
)

/* Button - Experience starts here */
const onClick = () => {
  gsap.set([document.querySelector('.app header'), document.querySelector('.app main')], {
    display: 'block'
  })

  animateTo(
    landingPage,
    {
      opacity: 0,
      display: 'none'
    },
    () => window.location.assign(PROJECT_PATH + '#/' + data[0].intro.name)
  )
}
ReactDOM.render(
  <NextButton variant="contained" onClick={onClick}>
    Let's get started
  </NextButton>,
  landingPage.querySelector('.button-area .button-div')
)

/* header/footer */
ReactDOM.render(<Header />, landingPage.querySelector('header'))
/* footer will come from .app to keep the expanded state */

const Landing = () => {
  const location = useLocation()

  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.visibility = 'visible'
  })

  useEffect(() => {
    if (location.pathname === '/') {
      gsap.set([document.querySelector('.app header'), document.querySelector('.app main')], {
        display: 'none'
      })

      animateTo(landingPage, {
        opacity: 1,
        display: 'flex'
      })

      staggerFromTo(
        [landingPage.querySelector('.title.top'), landingPage.querySelector('.title.bottom')],
        { transform: 'translateX(-40px)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
        1
      )
    } else {
      // in case of going next with back button
      gsap.set([document.querySelector('.app header'), document.querySelector('.app main')], {
        display: 'block'
      })

      animateTo(landingPage, {
        opacity: 0,
        display: 'none'
      })
    }
  }, [location])

  return null
}

export default Landing
