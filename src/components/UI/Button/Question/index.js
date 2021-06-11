import React, { useRef } from 'react'
import { Button, withStyles, useMediaQuery } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import theme, { colors } from '@/styles/theme'
import './index.scss'

const StyledButton = withStyles({
  root: {
    backgroundColor: '#fff',
    borderRadius: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    border: 0,
    color: '#000',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
    },
    transform: 'translateY(0)',
    transition: 'all 0.2s linear',
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
    }
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'capitalize'
  },
  startIcon: {
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 8
  }
})(Button)

const QuestionButton = (props) => {
  const { text = '', onClick = () => {} } = props

  const ref = useRef()

  const above_md = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const icon = (text) => {
    switch (text.toLowerCase()) {
      case 'yes':
        return <DoneIcon style={{ color: colors.orange, fontSize: above_md ? 40 : 24 }} />
      case 'somewhat':
        return <DoneIcon style={{ color: colors.webSafeGold, fontSize: above_md ? 40 : 24 }} />
      case 'no':
        return <ClearIcon style={{ color: colors.grayscale[3], fontSize: above_md ? 40 : 24 }} />
      default:
        return null
    }
  }

  const _onClick = () => {
    onClick()
    ref.current.style.transform = 'translateY(5px)'
  }

  return (
    <StyledButton
      ref={ref}
      className="question-button"
      variant="contained"
      fullWidth
      disableRipple
      disableFocusRipple
      disableElevation
      onClick={_onClick}
      startIcon={icon(text)}>
      {text}
    </StyledButton>
  )
}

export default QuestionButton
