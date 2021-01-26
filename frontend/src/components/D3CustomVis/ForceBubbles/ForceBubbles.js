import React, { useEffect, useRef } from 'react'

import { select, selectAll, event } from 'd3-selection';
import { transition } from 'd3-transition';
import { scaleOrdinal } from 'd3-scale';
import { schemeAccent } from 'd3-scale-chromatic';
import { forceSimulation, forceManyBody, forceX, forceY, forceCollide } from 'd3-force';

import './force-bubbles.css';


const ForceBubbles = (props) => {
  const d3Container = useRef(null);
  
  const calcSize = (value) => {
    if (typeof props.sizeBy !== 'undefined') {
      var max = props.ranges[props.sizeBy].max
      var scale = props.scale
      
      return Math.floor(5 + (value / max * 45 * scale))
    } else {
      return 20
    }
  }
  
  const calcX = (value) => {
    if (typeof props.groupBy !== 'undefined') {
      var range = props.ranges[props.groupBy]
      var catWidth = range.set.length + 1
      var catIndex = range.set.indexOf(value) + 1
      return props.width / catWidth * catIndex
    } else {
      return props.width / 2
    }
  }

  const colorScale = scaleOrdinal().range(schemeAccent)

  const simulation = forceSimulation(props.data)
    .force('charge', forceManyBody().strength(5))
    .force('forceX', forceX(d => calcX(d[props.groupBy].value)))
    .force('forceY', forceY(props.height / 2))
    .force('collision', forceCollide().radius(d => calcSize(d[props.sizeBy].value)))
    .stop()


  useEffect(
    () => {
      if (typeof props !== 'undefined' && typeof props.data !== 'undefined' && d3Container.current !== null) {
        for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
          simulation.tick();
        }
        
        var circles = select(d3Container.current)
          .selectAll('circle')
          .data(props.data, d => d.observationId) 
    
        circles.enter()
          .append('circle')
            .classed('bubble', true)
            .attr('r', d => calcSize(d[props.sizeBy].value))
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .style('fill', d => colorScale(d[props.colorBy].value))
    
        circles.transition()
          .duration(250)
            .attr('r', d => calcSize(d[props.sizeBy].value))
            .attr('cx', d =>  d.x)
            .attr('cy', d => d.y)
            .style('fill', d => colorScale(d[props.colorBy].value))
      
        circles.exit().remove()
    
        // ensure unique categories in different fields by joining field name to field value
        var categoricals = []
        props.ranges[props.groupBy].set.forEach(categorical => {
          categoricals.push({
            id: ['group', props.groupBy, categorical].join('.'),
            value: categorical
          })
        })
    
        var labels = select(d3Container.current)
          .selectAll('text')
            .data(categoricals, d => d.id) 
    
        labels.enter()
          .append('text')
            .attr('x', d => calcX(d.value))
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .selectAll('tspan')
              .data(d => typeof d.value === 'string' ? d.value.split(' ') : [d.value]).enter()
                .append('tspan')
                .attr('class', 'label')
                .attr('x', function(d) { return select(this.parentNode).attr('x')})
                .attr('dy', 16)
                .text(d => d)
        
        labels.transition()
          .attr('x', d => calcX(d.value))
          .on('end', d => {
            selectAll('tspan')
              .transition()
              .attr('x', function(d) { return select(this.parentNode).attr('x') })
          })
        
        labels.exit().remove()
          
        // ensure unique categories in different fields by joining field name to field value
        var colorBys = []
        props.ranges[props.colorBy].set.forEach(colorBy => {
          colorBys.push({
            id: ['color', props.colorBy, colorBy].join('.'),
            value: colorBy
          })
        })
    
        var rects = select(d3Container.current)
          .selectAll('.legendRect')                     
            .data(colorBys, d => d.id)                                  
        
        rects.enter()        
          .append('rect')
            .attr('class', 'legendRect')                             
            .attr('width', 12)
            .attr('height', 12)
            .attr('x', (props.width / 2) - 100)
            .attr('y', (d, i) => props.height - (i + 1) * 20)
            .style('fill', d => colorScale(d.value))                            
        
        rects.transition()
          .duration(0)
            .attr('x', (props.width / 2) - 100)
    
        rects.exit().remove()
    
        var keys = select(d3Container.current)
          .selectAll('.legendKey')
            .data(colorBys, d => d.id)
        
        keys.enter()
          .append('text')
            .attr('class', 'legendKey')
            .attr('x', (props.width / 2) - 85)
            .attr('y', (d, i) => props.height + 10 - (i + 1) * 20)
            .text(d => d.value)
        
        keys.exit().remove()
      }
    },
    [props.data, d3Container.current]
  )

  return (
    <svg
      width={props.width}
      height={props.height}
      ref={d3Container}
    />
  )
}

export default ForceBubbles