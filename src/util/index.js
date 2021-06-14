import { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import gsap, { TweenMax } from 'gsap'
import { transitionDuration } from '@/styles/theme'
import { updateCurrentQuestionId, updateProgressBarState } from '@/store/slices/progressSlice'
import { useDispatch } from 'react-redux'
import { toLower } from 'lodash-es'

export const RedirectToHome = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname !== '/') {
      history.push('/')
      dispatch(updateCurrentQuestionId(0))
      dispatch(updateProgressBarState(false))
    }
  }, [])

  return null
}

export const cleanPath = (url) => {
  return url.replace('//', '/')
}

export const animateTo = (ref = '', to = {}, onComplete = () => {}) => {
  gsap.to(ref, {
    duration: transitionDuration,
    ease: 'power2.inOut',
    ...to,
    onComplete: () => {
      onComplete()
    }
  })
}

export const staggerTo = (
  ref = [],
  to = {},
  duration = transitionDuration,
  stagger = 0.2,
  onComplete = () => {}
) => {
  TweenMax.staggerTo(
    ref,
    duration,
    {
      ease: 'power2.inOut',
      ...to,
      onCompleteAll: () => {
        onComplete()
      }
    },
    stagger
  )
}

export const staggerFromTo = (
  ref = [],
  from = {},
  to = {},
  duration = transitionDuration,
  stagger = 0.2,
  onComplete = () => {}
) => {
  TweenMax.staggerFromTo(
    ref,
    duration,
    from,
    {
      ease: 'power2.inOut',
      ...to,
      onCompleteAll: () => {
        onComplete()
      }
    },
    stagger
  )
}

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export const usePrevious = (value = null) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const resetFocus = () => {
  document.body.setAttribute('tabindex', -1)
  document.body.focus()
  document.body.removeAttribute('tabindex')
}

export const onEnterPressed = (e, func = () => {}) => {
  if (
    toLower(e.code) === 'enter' ||
    toLower(e.code) === 'space' ||
    toLower(e.code) === 'numpadenter'
  ) {
    e.preventDefault()
    func()
  }
}

export const removeTrailingSlashes = (url) => {
  return url.replace(/\/+$/, '')
}

export const removeProtocols = (url) => {
  return url.replace(/(^\w+:|^)\/\//, '')
}

export const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2
