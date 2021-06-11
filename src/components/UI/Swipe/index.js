import React from 'react'
import { useSwipeable } from 'react-swipeable'

const Swipe = (props) => {
  const { swipedRight = () => {}, swipedLeft = () => {}, swipedUp = () => {} } = props

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      swipedLeft()
    },
    onSwipedRight: () => {
      swipedRight()
    },
    onSwipedUp: () => {
      swipedUp()
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
    delta: 20
  })

  return (
    <div className="swipe" {...handlers}>
      {props.children}
    </div>
  )
}

export default Swipe
