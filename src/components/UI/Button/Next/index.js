import React, { useEffect, useRef } from 'react'
import { Button, withStyles } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import theme, { buttonHeight } from '@/styles/theme'
import { animateTo } from '@/util'
import './index.scss'

const StyledButton = withStyles({
  root: {
    borderRadius: 0,
    padding: theme.spacing(2),
    height: buttonHeight
  },
  label: {
    textTransform: 'none'
  },
  endIcon: {}
})(Button)

const NextButton = (props) => {
  const { onClick = () => {}, variant = 'outlined', type = '' } = props

  const ref = useRef()

  useEffect(() => {
    animateTo(ref.current, {
      transform: 'translateY(0)',
      opacity: 1,
      duration: 1
    })
  }, [])

  return (
    <div ref={ref} className="next-button">
      <StyledButton
        className={variant}
        id={'button-' + type}
        variant={variant}
        onClick={onClick}
        endIcon={<ArrowForwardIcon style={{ fontSize: 24 }} />}
        fullWidth
        disableRipple
        disableFocusRipple
        disableElevation>
        {props.children}
      </StyledButton>
    </div>
  )
}

export default NextButton
