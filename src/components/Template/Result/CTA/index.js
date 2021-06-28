import React from 'react'
import { Box } from '@material-ui/core'
import Button from '@/components/UI/Button'
import './index.scss'

const CTA = ({ href = '' }) => {
  return (
    <Box
      className="contact-us"
      width={1}
      p={2}
      bgcolor="#C6D1D6"
      display="flex"
      alignItems="center"
      justifyContent="space-between">
      <span role="text">Want to learn more about Active Wealth?</span>
      <Button variant="contained" href={href}>
        Contact us
      </Button>
    </Box>
  )
}

export default CTA
