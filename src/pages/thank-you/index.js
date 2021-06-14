import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'
import ThankYou from '@/pages/thank-you/ThankYou'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ThankYou />
  </ThemeProvider>,
  document.querySelector('#root-thankyou')
)
