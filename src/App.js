import React from 'react'
import Routes from '@/components/Routes'
import Header from '@/components/UI/Header'
import Footer from '@/components/UI/Footer'
import Landing from '@/components/Template/Landing'
import { Container, Grid, Box } from '@material-ui/core'
import '@/util/hotjar'
// import Result from '@/components/Template/Result/Test'

const App = () => {
  return (
    <Container maxWidth="xl">
      <div className="app">
        <Landing />

        <header>
          <Header />
        </header>

        <main>
          <Box>
            <Grid container>
              <Routes />
            </Grid>
          </Box>
        </main>

        {/* <Result /> */}

        <footer>
          <Footer />
        </footer>
      </div>
    </Container>
  )
}

export default App
