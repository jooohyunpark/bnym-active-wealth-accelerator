import React, { useEffect, useState, useRef } from 'react'
import Chart from '@/components/UI/Chart'
import { useSelector } from 'react-redux'
import { selectTotalQuestionCount } from '@/store/slices/progressSlice'
import { selectResponseCount, selectResponseData } from '@/store/slices/responseSlice'
import { useHistory } from 'react-router-dom'
import { Grid, Modal, Backdrop, Fade, IconButton, Box, useMediaQuery } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import theme, { colors } from '@/styles/theme'
import '../index.scss'
import { animateTo, cleanURL } from '@/util'
import { PROJECT_PATH } from '@/data'
import ResultNav from '@/components/Template/Result/ResultNav'
import Button from '@/components/UI/Button'
import test from './testResponseData.json'

const Result = () => {
  const history = useHistory()
  const ref = useRef()
  const iframe = useRef()
  const responseCount = useSelector(selectResponseCount)
  const totalQuestionCount = useSelector(selectTotalQuestionCount)
  // const responseData = useSelector(selectResponseData)
  const responseData = test

  const [open, setOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const above_sm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const above_md = useMediaQuery((theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    animateTo(ref.current, { opacity: 1 })

    // // redirect
    // if (responseCount < totalQuestionCount) {
    //   // history.push('/')
    // }
    // // mounted
    // else {

    //skip button onclick event inside iframe
    bindSkipButtonOnclick()
    // }
  }, [])

  const bindSkipButtonOnclick = () => {
    const listenSkipButton = setInterval(() => {
      const form = iframe.current.contentWindow.document

      if (form && form.body && form.body.querySelector('.skip-button')) {
        form.body.querySelector('.skip-button').onclick = () => {
          setOpen(false)

          /** analytics */
          if (window.formSubmitted) return
          _satellite.track('submit', { 'email- supplied': 'No' })
          console.log('windw.formsubmitted: ', window.formSubmitted)
        }

        clearInterval(listenSkipButton)
      }
    }, 100)
  }

  // Note that this runs forcedly by onClose event
  useEffect(() => {
    if (window.formSubmitted) setSubmitted(true)
  }, [window.formSubmitted])

  return (
    <Grid
      ref={ref}
      className={`result ${above_md ? 'gutter-outer' : ''}`}
      container
      item
      direction="column"
      justify="center"
      style={{ paddingBottom: 0 }}>
      <Modal
        role="main"
        aria-labelledby="iframe"
        open={open}
        className="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          className: 'backdrop'
        }}>
        <Fade in={open}>
          <Box
            width={1}
            height={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            <Box
              className="iframe-container"
              width="640px"
              height="740px"
              bgcolor="#fff"
              style={{
                position: 'relative'
              }}>
              <IconButton
                aria-label="close"
                onClick={() => {
                  setOpen(false)

                  /** analytics */
                  if (window.formSubmitted) return
                  _satellite.track('submit', { 'email- supplied': 'No' })
                  console.log('windw.formsubmitted: ', window.formSubmitted)
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: above_sm ? theme.spacing(3) : theme.spacing(2)
                }}>
                <CloseIcon style={{ color: '#000', fontSize: 32 }} />
              </IconButton>

              <iframe
                ref={iframe}
                id="iframe"
                title="Lead Generation Form"
                src={cleanURL(PROJECT_PATH + '/form.html')}></iframe>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* desktop nav */}
      {above_md ? (
        <Grid
          className="result-nav-area-desktop"
          item
          xs={12}
          style={{ paddingTop: 0, paddingBottom: 0 }}>
          <ResultNav updateIndex={(i) => setActiveIndex(i)} activeIndex={activeIndex} />
        </Grid>
      ) : null}

      <Grid
        className="result-content-container"
        container
        item
        style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid className="chart-area" item xs={12} md={6}>
          {above_md ? null : (
            <div className="mobile-label" className="gutter-outer">
              <h2 style={{ color: colors.black }}>Your Results</h2>
            </div>
          )}

          <div className="chart-div">
            <Chart activeIndex={activeIndex} onClick={(i) => setActiveIndex(i)} />
          </div>
        </Grid>

        <Grid className="result-content-area" item xs={12} md={6}>
          <Box
            className="result-content-area-box"
            width={1}
            height={1}
            bgcolor={colors.white}
            px={above_md ? 2 : 0}
            py={above_md ? 5 : 0}>
            {/* tablet/mobile nav */}
            {above_md ? null : (
              <ResultNav
                className="gutter-outer"
                updateIndex={(i) => setActiveIndex(i)}
                activeIndex={activeIndex}
              />
            )}

            <Box
              className={above_md ? 'result-content' : 'result-content gutter-outer'}
              width={1}
              px={above_md ? 3 : 5}
              py={above_md ? 0 : 5}
              height={above_md ? 1 : 'auto'}
              style={{ overflow: above_md ? 'auto' : 'unset' }}
              tabIndex={above_md ? 0 : -1}>
              {activeIndex === -1 ? (
                // overview
                <div className="overview">
                  <div className="summary">
                    <h2>{responseData.summary.header}</h2>
                    <p>{responseData.summary.body}</p>
                    <br />
                    <p>Click through each practice for your customized recommendations.</p>
                  </div>
                  {submitted ? null : (
                    <Box
                      className="contact-us"
                      width={1}
                      p={2}
                      bgcolor="#C6D1D6"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between">
                      <span role="text">Want to learn more about Managing your Active Wealth?</span>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpen(true)
                          bindSkipButtonOnclick()
                        }}>
                        Contact us
                      </Button>
                    </Box>
                  )}
                </div>
              ) : (
                // section
                <div className="sections">
                  <div className="summary">
                    <h2>{responseData.sections[activeIndex].section}</h2>
                    <p>{responseData.sections[activeIndex].copy}</p>
                  </div>
                  <hr />
                  <div className="recommendations">
                    <h4>RECOMMNEDATIONS</h4>
                    <ul>
                      {responseData.sections[activeIndex].recommendations.map(
                        (recommendation, i) => {
                          return <li key={i}>{recommendation}</li>
                        }
                      )}
                    </ul>
                  </div>
                  <hr />
                  <div className="articles">
                    <h4>ARTICLE</h4>
                    {responseData.sections[activeIndex].articles.map((article, i) => {
                      return (
                        <div className="article" key={i}>
                          <h2 className="article-title bold PublicoPro">
                            <a href={article.link}>{article.linkText} </a>
                          </h2>
                          <p>{article.copy}</p>
                        </div>
                      )
                    })}
                  </div>

                  {submitted ? null : (
                    <Box
                      className="contact-us"
                      width={1}
                      p={2}
                      mt={8}
                      bgcolor="#C6D1D6"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between">
                      <span role="text">Want to learn more about Managing your Active Wealth?</span>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setOpen(true)
                          bindSkipButtonOnclick()
                        }}>
                        Contact us
                      </Button>
                    </Box>
                  )}
                </div>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Result
