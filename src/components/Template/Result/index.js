import React, { useEffect, useState, useRef } from 'react'
import Chart from '@/components/UI/Chart'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectTotalQuestionCount,
  updateCurrentQuestionId,
  updateProgressBarState
} from '@/store/slices/progressSlice'
import { selectResponseCount, selectResponseData } from '@/store/slices/responseSlice'
import { useHistory } from 'react-router-dom'
import { Grid, Modal, Backdrop, Fade, IconButton, Box, useMediaQuery } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import theme, { colors } from '@/styles/theme'
import './index.scss'
import { animateTo, cleanPath } from '@/util'
import { PROJECT_PATH } from '@/data'
import ResultNav from '@/components/Template/Result/ResultNav'
import Button from '@/components/UI/Button'

const Result = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const ref = useRef()
  const iframe = useRef()
  const responseCount = useSelector(selectResponseCount)
  const totalQuestionCount = useSelector(selectTotalQuestionCount)
  const responseData = useSelector(selectResponseData)

  const [open, setOpen] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const above_sm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const above_md = useMediaQuery((theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    // redirect
    if (responseCount < totalQuestionCount) {
      history.push('/')
      dispatch(updateCurrentQuestionId(0))
      dispatch(updateProgressBarState(false))
    }
    // mounted
    else {
      animateTo(ref.current, { opacity: 1 })

      bindSkipButtonOnClick()

      /* analytics */
      digitalData = {
        page: {
          pageInfo: {
            pageName: 'Results'
          }
        },
        ResultScores: {
          scoreValues: responseData.sections.map((d) => d.section + '-' + d.score).join('|')
        }
      }
      _satellite.track('process', { status: 'end' })
      console.log('tagging -------------------- process end')
    }
  }, [])

  // Note that this runs forcedly by onClose event
  useEffect(() => {
    if (window.formSubmitted) setSubmitted(true)
  }, [window.formSubmitted])

  //skip button onclick event inside iframe
  const bindSkipButtonOnClick = () => {
    const listenSkipButton = setInterval(() => {
      const form = iframe.current.contentWindow.document

      if (form && form.body && form.body.querySelector('.skip-button')) {
        form.body.querySelector('.skip-button').onclick = () => {
          setOpen(false)

          /** analytics */
          if (window.formSubmitted) return
          _satellite.track('submit', { ['email-form']: 'No' })
          console.log('tagging-------------------- email-form No')
        }
        clearInterval(listenSkipButton)
      }
    }, 100)
  }

  return responseCount === totalQuestionCount ? (
    <Grid
      ref={ref}
      className={`result ${above_md ? 'gutter-outer' : ''}`}
      container
      item
      direction="column"
      justify="center"
      style={{ paddingBottom: 0 }}>
      <Modal
        role="complementary"
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
                  _satellite.track('submit', { ['email-form']: 'No' })
                  console.log('tagging-------------------- email-form No')
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
                id="iframe"
                ref={iframe}
                title="Lead Generation Form"
                src={cleanPath(PROJECT_PATH + '/form.html')}></iframe>
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
              height={above_md ? 1 : 'auto'}
              px={above_md ? 3 : 5}
              py={above_md ? 0 : 5}
              style={{ overflow: above_md ? 'auto' : 'unset' }}
              tabIndex={above_md ? 0 : -1}>
              {activeIndex === -1 ? (
                // overview
                <div className="overview">
                  <div className="summary">
                    <h2 role="heading" aria-level="1">
                      {responseData.summary.header}
                    </h2>
                    <p>{responseData.summary.body}</p>
                    <br />
                    <p>Click through each practice for your customized recommendations.</p>
                  </div>

                  {/* cta */}
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
                          bindSkipButtonOnClick()
                        }}>
                        Contact us
                      </Button>
                    </Box>
                  )}
                </div>
              ) : (
                // section
                <div className="sections">
                  {/* summary */}
                  <div className="summary" role="group">
                    <h2 role="heading" aria-level="1">
                      {responseData.sections[activeIndex].section}
                    </h2>
                    <p>{responseData.sections[activeIndex].copy}</p>
                  </div>
                  <hr />

                  {/* recommendation */}
                  {responseData.sections[activeIndex].recommendations.length > 0 ? (
                    <div className="recommendations" role="group">
                      <div className="h4">RECOMMENDATIONS</div>
                      <ul>
                        {responseData.sections[activeIndex].recommendations.map(
                          (recommendation, i) => {
                            return <li key={i}>{recommendation}</li>
                          }
                        )}
                      </ul>
                    </div>
                  ) : null}
                  {responseData.sections[activeIndex].recommendations.length > 0 ? <hr /> : null}

                  {/* article */}
                  <div className="articles" role="group">
                    {responseData.sections[activeIndex].articles.map((article, i) => {
                      return (
                        <div className="article" key={i}>
                          <div className="h4">{article.type}</div>
                          <div className="article-title bold PublicoPro">
                            <a href={article.link} target="_blank" role="link" tabIndex="0">
                              {article.linkText}
                            </a>
                          </div>
                          <p>{article.copy}</p>
                        </div>
                      )
                    })}
                  </div>

                  {/* cta */}
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
                          bindSkipButtonOnClick()
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
  ) : null
}

export default Result
