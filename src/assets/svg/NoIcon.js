import React from 'react'

const NoIcon = ({ height = 24, color = '#000' }) => {
  return (
    <svg height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2.06066" y1="2.0409" x2="16.1615" y2="16.1418" stroke={color} strokeWidth="3" />
      <line x1="1.93934" y1="16.0409" x2="16.0402" y2="1.94005" stroke={color} strokeWidth="3" />
    </svg>
  )
}

export default NoIcon
