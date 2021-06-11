import React from 'react'
import { Box } from '@material-ui/core'
import { headerHeight } from '@/styles/theme'
import Logo from '@/assets/svg/Logo'
import '../index.scss'

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={headerHeight}
      style={{
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 10,
        maxWidth: 'unset'
      }}>
      <Box
        className="nav-container"
        display="flex"
        alignItems="center"
        width={1}
        px={4}
        style={{ position: 'relative' }}
        height={headerHeight}>
        <nav>
          <a
            href="/"
            aria-label="BNY Mellon Wealth Management Home CTA"
            tabIndex="0"
            style={{ display: 'flex', alignItems: 'center' }}>
            <Logo color="#fff" />
          </a>
        </nav>
      </Box>
    </Box>
  )
}

export default Header
