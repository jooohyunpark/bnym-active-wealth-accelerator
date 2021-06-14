import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'
import Form from '@/pages/form/Form'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Form />
  </ThemeProvider>,
  document.querySelector('#root-form')
)
