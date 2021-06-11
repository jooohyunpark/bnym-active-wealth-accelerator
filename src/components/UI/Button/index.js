import React from 'react'
import { Button, withStyles } from '@material-ui/core'
import theme, { colors, buttonHeight } from '@/styles/theme'

const StyledButton = withStyles({
  root: {
    borderRadius: 0,
    padding: theme.spacing(2),
    height: 50
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button)

const _Button = (props) => {
  const { onClick = () => {}, href = '', variant = 'outlined' } = props

  return (
    <StyledButton
      className={`button ${variant}`}
      variant={variant}
      onClick={onClick}
      href={href}
      disableRipple
      disableFocusRipple
      disableElevation
      target="_blank">
      {props.children}
    </StyledButton>
  )
}

export default _Button
