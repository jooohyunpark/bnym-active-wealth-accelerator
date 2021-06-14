import React, { useEffect, useRef } from 'react'
import { Box } from '@material-ui/core'
import './index.scss'
import { cleanPath, animateTo } from '@/util'
import { PROJECT_PATH, emailRegex } from '@/data'

const LeadForm = () => {
  const ref = useRef()

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://snippet.omm.crownpeak.com/s/d4bbde8e-7246-4d65-8beb-4fb5601e3ce1?_wco_embedid=snippet_1620998421752'
    script.async = true
    document.body.appendChild(script)

    // to thank you page
    const checkRedirectURL = setInterval(() => {
      const redirectURL = ref.current.querySelector('#redirecturl')

      if (redirectURL) {
        redirectURL.value = cleanPath(PROJECT_PATH + '/thank-you.html')

        clearInterval(checkRedirectURL)
      }
    }, 100)

    const checkForm = setInterval(() => {
      const form = ref.current.querySelector('form')

      if (form) {
        animateTo(ref.current, {
          opacity: 1,
          duration: 0.3
        })

        // tabIndex for scrolling accessibility
        form.setAttribute('tabindex', 0)

        // title
        form.querySelector('h2').textContent = 'Fill this out to see your results'
        form.querySelector('h2').setAttribute('role', 'heading')
        form.querySelector('h2').setAttribute('aria-level', 1)

        // paragraph injection
        form.querySelectorAll('p').forEach((p, i) => {
          if (i === 0) {
            p.textContent =
              'Our Active Wealth Accelerator has compiled your answers from each practice area to help you look at your financial wellness holistically.'
            p.style.marginBottom = '24px'
          } else if (i === 1) {
            p.textContent = 'Before we share your results, we just need a few details from you.'
            p.style.marginBottom = '48px'
          } else p.setAttribute('style', 'display: none;')
        })

        // force require
        form.querySelector('#first-name').setAttribute('required', '')
        form.querySelector('#last-name').setAttribute('required', '')
        form.querySelector('#email').setAttribute('required', '')

        // validation
        form.querySelector('#first-name').setAttribute('pattern', '^[a-zA-Z -]{1,50}$')
        form.querySelector('#last-name').setAttribute('pattern', '^[a-zA-Z -]{1,50}$')
        form.querySelector('#email').setAttribute('pattern', emailRegex)

        // email type
        form.querySelector('#email').setAttribute('type', 'email')

        // reset placeholder
        form.querySelector('#first-name').setAttribute('placeholder', '')
        form.querySelector('#last-name').setAttribute('placeholder', '')
        form.querySelector('#email').setAttribute('placeholder', '')

        // remove : from label
        form.querySelector('#first-name-label').textContent = 'First Name'
        form.querySelector('#last-name-label').textContent = 'Last Name'
        form.querySelector('#email-label').textContent = 'Email Address'

        // hide phone/city/state
        form.querySelectorAll('ul')[1].setAttribute('style', 'display: none;')

        // hide message
        form.querySelector('#question-label').setAttribute('style', 'display: none;')
        form.querySelector('#input-question').setAttribute('style', 'display: none;')

        // cta text
        form.querySelector('#submitid').textContent = 'See your results'

        // attach skip button
        const skipButton = document.createElement('a')
        skipButton.classList.add('skip-button')
        skipButton.setAttribute('tabindex', 0)
        skipButton.setAttribute('role', 'button')
        skipButton.textContent = 'Skip'
        const div = document.createElement('div')
        div.classList.add('skip-button-div')
        div.style.textAlign = 'center'
        div.appendChild(skipButton)
        form.querySelector('#submitid').parentNode.parentNode.after(div)

        // legal copy
        const legal = document.createElement('p')
        legal.classList.add('form-legal')
        legal.innerHTML =
          'For more information about how BNY Mellon Wealth Management uses your personal information, <a href="https://urldefense.com/v3/__https:/www.bnymellonwealth.com/privacy.jsp__;!!IHJ3XrWN4X8!ckHdrtGPf1zGtIW7me8g94AlV1m1UX8ypeDDr3GeAa0b5158HTCwFB41v5pQNXKAUA$" target="_blank">click here.</a>'
        form.querySelector('.skip-button-div').after(legal)

        clearInterval(checkForm)
      }
    }, 100)

    return () => {
      clearInterval(checkRedirectURL)
      clearInterval(checkForm)
    }
  }, [])

  return (
    <Box width={1} height={1}>
      <div ref={ref} id="snippet_1620998421752"></div>
    </Box>
  )
}

export default LeadForm
