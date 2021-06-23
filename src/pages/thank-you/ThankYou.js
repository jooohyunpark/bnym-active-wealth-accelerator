import React, { useEffect, useRef } from 'react'
import { Box } from '@material-ui/core'
import { breakpoints } from '@/styles/theme'
import './style.scss'

const ThankYou = () => {
  const h1 = useRef()

  useEffect(() => {
    window.parent.formSubmitted = true

    const resize = () => {
      h1.current.style.fontSize = '96px'
      h1.current.style.lineHeight = '112px'

      if (window.parent.innerWidth < breakpoints.md) {
        h1.current.style.fontSize = '72px'
        h1.current.style.lineHeight = '86px'
      }
      if (window.parent.innerWidth < breakpoints.sm) {
        h1.current.style.fontSize = '48px'
        h1.current.style.lineHeight = '56px'
      }
    }

    window.parent.addEventListener('resize', resize)
    resize()

    /* analytics */
    parent._satellite.track('submit', { ['email-form']: 'Yes' })
    // console.log('tagging-------------------- email-form Yes!!!!')

    return () => {
      window.parent.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="ThankYou">
      <Box className="content-area">
        <h1 ref={h1} role="status">
          Thank you!
        </h1>

        <p className="form-legal">
          For more information about how BNY Mellon Wealth Management uses your person
          information,&nbsp;
          <a
            href="https://urldefense.com/v3/__https:/www.bnymellonwealth.com/privacy.jsp__;!!IHJ3XrWN4X8!ckHdrtGPf1zGtIW7me8g94AlV1m1UX8ypeDDr3GeAa0b5158HTCwFB41v5pQNXKAUA$"
            target="_blank">
            click here.
          </a>
        </p>
      </Box>
    </div>
  )
}

export default ThankYou
