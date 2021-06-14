import React, { useEffect, useRef } from 'react'
import { Grid, Box } from '@material-ui/core'
import NextButton from '@/components/UI/Button/Next'
import { staggerTo, resetFocus } from '@/util'
import './index.scss'
import { startCase } from 'lodash-es'

const Interstitial = (props) => {
  const { onComplete = () => {}, data = {}, answer = 0, section = '' } = props

  const stat1 = useRef()
  const stat2 = useRef()

  useEffect(() => {
    staggerTo([stat1.current, stat2.current], {
      transform: 'translateX(0)',
      opacity: 1
    })

    resetFocus()
    window.scrollTo(0, 0)
    document.title = startCase(section + ' facts')
    document.querySelector('#pageTitle').textContent = startCase(section + ' facts')

    /* Analytics */
    _satellite.track(section, { [`${section}`]: answer === 2 ? 'yes' : 'no' })
    console.log('tagging---------------------------- insterstitial', {
      [`${section}`]: answer === 2 ? 'yes' : 'no'
    })
  }, [])

  return (
    <Grid className="interstitial" container item direction="row">
      <Box width={1} height={1} display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12} sm={8} md={6} className="interstitial-content-area">
          <Box>
            <h2 className="italic" role="heading" aria-level="1">
              {data.content}
            </h2>

            <div className="stats" role="text">
              <div className="h3">{data.text1}</div>
              <div className="h1" ref={stat1}>
                {data.stat1}
              </div>
              <div className="h3">{data.text2}</div>
              <div className="h1" ref={stat2}>
                {data.stat2}
              </div>
              <div className="h3">{data.text3}</div>
            </div>

            <p className="source">Stat source: {data.source}</p>
          </Box>
        </Grid>
        <Grid item xs={12} className="interstitial-button-area">
          <NextButton onClick={onComplete} type="interstitial">
            Let's keep going!
          </NextButton>
        </Grid>
      </Box>
    </Grid>
  )
}

export default Interstitial
