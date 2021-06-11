import { createMuiTheme } from '@material-ui/core/styles'
import variables from '@/styles/export.module.scss'

const px2num = (value) => {
  return Number(value.replace('px', ''))
}

export const transitionDuration = Number(variables.transitionDuration)
export const breakpoints = {
  xs: px2num(variables.xs),
  sm: px2num(variables.sm),
  md: px2num(variables.md),
  lg: px2num(variables.lg),
  xl: px2num(variables.xl)
}
export const headerHeight = px2num(variables.headerHeight)
export const buttonHeight = px2num(variables.buttonHeight)
export const buttonBottomSpacing = px2num(variables.buttonBottomSpacing)

export const colors = {
  blue: variables.blue,
  lightBlue: variables.lightBlue,
  black: variables.black,
  white: variables.white,
  white50: variables.white50,
  orange: variables.orange,
  error: variables.error,
  success: variables.success,
  webSafeGold: variables.webSafeGold,
  gold: variables.gold,
  lightGold: variables.lightGold,
  slate: variables.slate,
  pewter: variables.pewter,
  lightGray: variables.lightGray,
  grayscale: {
    1: variables['gray-1'],
    2: variables['gray-2'],
    3: variables['gray-3'],
    4: variables['gray-4'],
    5: variables['gray-5'],
    6: variables['gray-6']
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'light'
  },
  breakpoints: {
    values: {
      ...breakpoints
    }
  },
  spacing: px2num(variables.spacingBase),
  props: {
    MuiContainer: {
      maxWidth: 'xl'
    },
    MuiGrid: { spacing: 0 }
  },
  overrides: {
    // Style sheet name ⚛️
    MuiContainer: {
      // Name of the rule
      root: {
        // Some CSS
      }
    }
  }
})

export default theme
