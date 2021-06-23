import React from 'react'

const YesIcon = ({ height = 24, color = '#000' }) => {
  return (
    <svg height={height} viewBox="0 0 41 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7.73913L8.17143 14L20 2" stroke={color} strokeWidth="3" />
      <path d="M21 8.73913L27.1714 15L39 3" stroke={color} strokeWidth="3" />
    </svg>
  )
}

export default YesIcon
