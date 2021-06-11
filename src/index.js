import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import { ThemeProvider } from '@material-ui/core/styles'
import App from '@/App'
import { HashRouter } from 'react-router-dom'
import theme from '@/styles/theme'

import '@/styles/main.scss'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
)
