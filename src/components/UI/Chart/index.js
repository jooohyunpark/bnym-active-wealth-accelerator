import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { colors } from '@/styles/theme'
import { Box } from '@material-ui/core'
import { useWindowSize } from '@/util'
import { selectChartData } from '@/store/slices/responseSlice'
import { useSelector } from 'react-redux'

const color = {
  background: colors.lightGold,
  gradient: colors.black,
  graph: colors.orange,
  graphInactive: '#ccc',
  labelArea: '#D5CDB9',
  labelAreaActive: colors.blue,
  labelText: colors.black,
  labelTextActive: colors.white
}

const lineWidth = 4
const adeg = Math.PI / 180
const backgroundStep = 6
const transitionDuration = 300

const Chart = (props) => {
  const data = useSelector(selectChartData)

  const { activeIndex = -1, onClick = () => {} } = props

  const container = useRef()
  const ref = useRef()

  const windowSize = useWindowSize()

  useEffect(() => {
    const svg = d3.select(ref.current)

    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const size = Math.min(
      container.current.getBoundingClientRect().width,
      container.current.getBoundingClientRect().height,
      720
    )
    const width = size - margin.left - margin.right
    const height = size - margin.top - margin.bottom
    const innerRadius = 0
    const radius = Math.min(width, height) / 2
    const labelAreaSize = (radius - lineWidth) / backgroundStep + lineWidth
    const labelFontSize = size > 560 ? 16 : size > 300 ? 12 : 8

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')'
      )

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => 1)

    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(
        (d) => (radius - labelAreaSize - innerRadius) * (d.data.score / 100.0) + innerRadius
      )

    const outlineArc = d3.arc().innerRadius(innerRadius).outerRadius(radius)

    const labelArc = d3
      .arc()
      .innerRadius(radius - labelAreaSize + lineWidth)
      .outerRadius(radius)
      .cornerRadius(5)

    // actual graph
    g.selectAll('.graphArea')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('class', 'graphArea')
      .attr('id', (d, i) => 'graphArea-' + i)
      .attr('stroke', 'none')
      .attr('d', arc)

    // labelArea
    g.selectAll('.labelArea')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('class', 'labelArea')
      .attr('id', (d, i) => 'labelArea-' + i)
      .attr('fill', color.labelArea)
      .attr('stroke', color.background)
      .attr('stroke-width', lineWidth)
      .attr('d', labelArc)
      .style('pointer-events', 'none')

    // label
    g.selectAll('.label')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('fill', color.labelText)
      .attr('id', (d, i) => 'label-' + i)
      .attr('dy', (d, i) =>
        d.endAngle > 90 * adeg && d.endAngle < 300 * adeg
          ? -labelAreaSize / 2 + labelFontSize / 2
          : labelAreaSize / 2 + labelFontSize / 4
      )
      .append('textPath')
      .attr('startOffset', '50%')
      .style('text-anchor', 'middle')
      .attr('font-family', 'Akkurat LL')
      .style('font-size', labelFontSize + 'px')
      .style('font-weight', 700)
      .style('letter-spacing', '1px')
      .style('text-transform', 'uppercase')
      .attr('xlink:href', (d, i) => '#label' + i)
      .text((d) => d.data.label)

    // lines
    g.selectAll('.outlineArc')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('class', 'outlineArc')
      .attr('fill', 'transparent')
      .attr('stroke', color.background)
      .attr('stroke-width', lineWidth)
      .attr('d', outlineArc)
      .style('cursor', 'pointer')
      .on('click', function (e, d) {
        onClick(d.index)
      })
      .on('mouseover', function (e, d) {
        d3.select('#labelArea-' + d.index)
          .transition()
          .duration(transitionDuration)
          .attr('fill', color.labelAreaActive)

        d3.select('#label-' + d.index)
          .transition()
          .duration(transitionDuration)
          .attr('fill', color.labelTextActive)
      })
      // for label placement
      .each(function (d, i) {
        //Search pattern for everything between the start and the first capital L
        var firstArcSection = /(^.+?)L/

        //Grab everything up to the first Line statement
        var newArc = firstArcSection.exec(d3.select(this).attr('d'))[1]
        //Replace all the commas so that IE can handle it
        newArc = newArc.replace(/,/g, ' ')

        //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
        //flip the end and start position
        if (d.endAngle > 90 * adeg && d.endAngle < 300 * adeg) {
          //Everything between the capital M and first capital A
          var startLoc = /M(.*?)A/
          //Everything between the capital A and 0 0 1
          var middleLoc = /A(.*?)0 0 1/
          //Everything between the 0 0 1 and the end of the string (denoted by $)
          var endLoc = /0 0 1 (.*?)$/
          //Flip the direction of the arc by switching the start and end point
          //and using a 0 (instead of 1) sweep flag
          var newStart = endLoc.exec(newArc)[1]
          var newEnd = startLoc.exec(newArc)[1]
          var middleSec = middleLoc.exec(newArc)[1]

          //Build up the new arc notation, set the sweep-flag to 0
          newArc = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd
        }

        //Create a new invisible arc that the text can flow along
        svg
          .append('path')
          .attr('class', 'hiddenArcs')
          .attr('id', 'label' + i)
          .attr('d', newArc)
          .style('fill', 'none')
      })

    // gradient background
    for (let i = 1; i <= backgroundStep; i++) {
      g.append('circle')
        .attr('class', 'background')
        .attr('fill', color.gradient)
        .attr('opacity', 0.04)
        .attr('stroke', 'none')
        .attr('r', ((radius - labelAreaSize) / backgroundStep) * i)
        .style('pointer-events', 'none')
    }

    return () => {
      console.log('destory d3 chart')
      svg.selectAll('*').remove()
    }
  }, [windowSize])

  useEffect(() => {
    d3.selectAll('.outlineArc').on('mouseout', function (e, d) {
      if (d.index === activeIndex) return
      d3.select('#labelArea-' + d.index)
        .transition()
        .duration(transitionDuration)
        .attr('fill', color.labelArea)

      d3.select('#label-' + d.index)
        .transition()
        .duration(transitionDuration)
        .attr('fill', color.labelText)
    })

    d3.selectAll('.graphArea')
      .transition()
      .duration(transitionDuration)
      .attr('fill', (d, i) => {
        if (activeIndex === -1 || activeIndex === i) return color.graph
        else return color.graphInactive
      })

    d3.selectAll('.labelArea')
      .transition()
      .duration(transitionDuration)
      .attr('fill', (d, i) => {
        if (activeIndex === i) return color.labelAreaActive
        else return color.labelArea
      })

    d3.selectAll('.label')
      .transition()
      .duration(transitionDuration)
      .attr('fill', (d, i) => {
        if (activeIndex === i) return color.labelTextActive
        else return color.labelText
      })
  }, [activeIndex, windowSize])

  return (
    <Box
      ref={container}
      width={1}
      height={1}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <svg
        ref={ref}
        aria-label="Interactive chart displaying questionnaire results"
        role="img"></svg>
    </Box>
  )
}

export default Chart
