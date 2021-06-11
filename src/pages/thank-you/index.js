import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'
import ThankYou from '@/pages/thank-you/ThankYou'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ThankYou />
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root-thankyou')
)
