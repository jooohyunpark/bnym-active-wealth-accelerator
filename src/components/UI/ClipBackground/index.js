import React, { useEffect, useRef } from 'react'
import { Box } from '@material-ui/core'
import './index.scss'
import { useWindowSize } from '@/util'
import { breakpoints, colors } from '@/styles/theme'
import { animateTo } from '@/util'

const source = {
  w: 383.75,
  h: 157.69
}

const elevationOffset = 0.05 // for safari, we should elevate clip path a tiny bit.
const resolution = source.h / source.w

const ClipBackground = (props) => {
  const { src = null, alt = '', view = 'page' } = props

  const image = useRef()
  const windowSize = useWindowSize()

  const clipWidth = Math.min(windowSize.width, 1920)
  const clipHeight = clipWidth * resolution

  const rightHeightOffset = () => {
    if (windowSize.width < breakpoints.sm) return 120
    if (windowSize.width < breakpoints.md) return 160
    if (windowSize.width < breakpoints.lg) return 120
    else return 100
  }

  const orangeBackgroundSize = () => {
    if (windowSize.width < breakpoints.md) return 360
    else return 400
  }

  const rightHeight = () => {
    return 1 - clipHeight / (clipHeight + rightHeightOffset())
  }

  useEffect(() => {
    if (src)
      animateTo(image.current, {
        transform: 'scale(1)',
        duration: 1
      })
  }, [])

  return (
    <Box
      className="clip-background"
      width={1}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        maxHeight: '100%',
        overflow: 'hidden'
      }}>
      {/* landing triangle svg */}
      {view === 'landing' ? (
        <Box
          className="orange-background"
          style={{
            position: 'absolute',
            right: 0,
            height: orangeBackgroundSize(),
            width: orangeBackgroundSize() / resolution,
            overflow: 'hidden'
          }}>
          <Box
            bgcolor={colors.orange}
            width={1}
            height={1}
            style={{
              clipPath: "url('#clip-orange-background')",
              WebkitClipPath: "url('#clip-orange-background')"
            }}></Box>

          <svg width="0" height="0">
            <defs>
              <clipPath id="clip-orange-background" clipPathUnits="objectBoundingBox">
                <polygon points="1 0, 0 0, 1 1" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : null}

      <div
        className="clip-area"
        style={{
          width: clipWidth,
          height: clipHeight + rightHeightOffset(),
          clipPath: `url('#clip-${view}')`,
          WebkitClipPath: `url('#clip-${view}')`
        }}>
        {src ? (
          <img
            ref={image}
            src={require(`@/${src}`)}
            alt={alt}
            style={{
              transform: 'scale(1.3)'
            }}
          />
        ) : (
          <div className="gradient-bg" />
        )}

        <svg width="0" height="0">
          <defs>
            <clipPath id={'clip-' + view} clipPathUnits="objectBoundingBox">
              <polygon
                points={`0 0, 1 0, 1 ${rightHeight() - elevationOffset}, 0 ${1 - elevationOffset}`}
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </Box>
  )
}

export default ClipBackground
