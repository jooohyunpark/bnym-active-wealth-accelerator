import React from 'react'
import { Box } from '@material-ui/core'
import { colors } from '@/styles/theme'
import data from '@/data/index.json'
import './index.scss'
import { onEnterPressed } from '@/util'

const ResultNav = (props) => {
  const { className = '', updateIndex = () => {}, activeIndex = -1 } = props

  const onClickOverview = () => {
    updateIndex(-1)
    document.querySelector('.result-content').scrollTop = 0

    /* Analytics */
    _satellite.track('results-link-tracking', { linkName: 'overview' })
    console.log('tagging------------------------- resultnav', { linkName: 'overview' })
  }

  const onClick = (i, name) => {
    updateIndex(i)
    document.querySelector('.result-content').scrollTop = 0

    /* Analytics */
    _satellite.track('results-link-tracking', { linkName: name })
    console.log('tagging------------------------- resultnav', {
      linkName: name
    })
  }

  return (
    <Box
      className={`result-nav ${className}`}
      width={1}
      bgcolor={colors.black}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}>
      <h3 className="PublicoPro">Your Results</h3>
      <nav className="result-nav-links" aria-label="Results menu" tabIndex="0">
        <a
          className={activeIndex === -1 ? 'active' : ''}
          onClick={onClickOverview}
          onKeyDown={(e) => onEnterPressed(e, onClickOverview)}
          role="button"
          tabIndex="0">
          Overview
        </a>
        {data.map((section, i) => {
          return (
            <a
              className={activeIndex === i ? 'active' : ''}
              onClick={() => onClick(i, section.name)}
              onKeyDown={(e) => onEnterPressed(e, () => onClick(i, section.name))}
              key={'result-nav-' + i}
              role="button"
              tabIndex="0">
              {section.name}
            </a>
          )
        })}
      </nav>
    </Box>
  )
}

export default ResultNav
