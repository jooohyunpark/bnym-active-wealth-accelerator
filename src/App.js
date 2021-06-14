import React from 'react'
import Routes from '@/components/Routes'
import Header from '@/components/UI/Header'
import Footer from '@/components/UI/Footer'
import Landing from '@/components/Template/Landing'
import { Container, Grid, Box } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { taggingScript } from '@/data'

const App = () => {
  return (
    <Container maxWidth="xl">
      {/* head - tagging */}
      <Helmet>
        <script src={taggingScript(window.location.hostname)} async></script>
      </Helmet>

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

        <footer>
          <Footer />
        </footer>
      </div>
    </Container>
  )
}

export default App
