import React, { useState, useRef } from 'react'
import { Box } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import './index.scss'
import Button from '@/components/UI/Button'
import { onEnterPressed } from '@/util'

const Footer = () => {
  const ref = useRef()
  const [expanded, setExpanded] = useState(false)

  return (
    <Box
      ref={ref}
      className={expanded ? 'legal expanded' : 'legal'}
      width={1}
      style={{
        minHeight: 100,
        margin: '0 auto'
      }}>
      <div className="legal-area">
        <div
          className="legal-cta"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          onKeyDown={(e) => onEnterPressed(e, () => setExpanded(!expanded))}>
          <ArrowRightIcon />
          <span role="button" tabIndex="0">
            Legal
          </span>
        </div>
      </div>
      <div className="legal-content">
        <p>
          Securities (including shares of mutual funds), alternative investments, and other
          investment products are not bank deposits and are not insured by the FDIC or any other
          agency of the United States, nor are they obligations of, or insured or guaranteed by, BNY
          Mellon Wealth Management or any of its subsidiaries or affiliates. Securities (including
          shares of mutual funds) and other investments involve investment risks, including the
          possible loss of value.
        </p>
        <p>
          The information provided is for illustrative/educational purposes only. All investment
          strategies referenced in this material come with investment risks, including loss of value
          and/or loss of anticipated income. Past performance does not guarantee future results. No
          investment strategy or risk management technique can guarantee returns in any market
          environment. This material is not intended to constitute legal, tax, investment or
          financial advice. Effort has been made to ensure that the material presented herein is
          accurate at the time of publication. However, this material is not intended to be a full
          and exhaustive explanation of the law in any area or of all of the tax, investment or
          financial options available. The information discussed herein may not be applicable to or
          appropriate for every investor and should be used only after consultation with
          professionals who have reviewed your specific situation. BNY Mellon Wealth Management may
          refer clients to certain of its affiliated offering expertise, products and services which
          may be of interest to the client. Use of an affiliate after such a referral remains the
          sole decision of the client. BNY Mellon Wealth Management conducts business through
          various operating subsidiaries of The Bank of New York Mellon Corporation.
        </p>
        <p>
          BNY Mellon Wealth Management will not provide products or services where those products or
          services are not permitted under applicable law or under firm policies.
        </p>
      </div>

      <div className="legal-contact-us">
        <Button variant="outlined" href="https://www.bnymellonwealth.com/contact-us.jsp">
          Contact Us
        </Button>
      </div>
    </Box>
  )
}

export default Footer
