import React, { useEffect, useMemo, useRef } from 'react';

import * as d3 from 'd3';

import { segmentMap } from '../constants/seven-segment';

import { NumberOptions, SevenSegmentConsonant } from '../types/font-value';

type SevenSegmentProps = {
  value: NumberOptions | SevenSegmentConsonant;
  width?: number;
  thickness?: number;
  color?: string;
};

const SevenSegment: React.FC<SevenSegmentProps> = ({
  value,
  width = 100,
  thickness = 10,
  color = '#f00',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const height = useMemo(() => 2 * width, [width]);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);

    const colorOn = color; // 세그먼트가 켜진 상태
    const colorOff = 'rgba(0, 0, 0, 0)'; // 세그먼트가 꺼진 상태: 투명

    const length = width - 2 * thickness;

    const rightX = width - thickness;
    const leftX = 0;

    const topY = thickness;
    const bottomY = height / 2 + thickness / 2;

    const hieghtLength = length + thickness / 2;

    // 세그먼트 좌표 정의
    const segments = [
      // [x, y, width, height, rotation]
      { x: thickness, y: 0, width: length, height: thickness }, // edge-Top (A)
      {
        x: rightX,
        y: topY,
        width: thickness,
        height: hieghtLength,
      }, // edge-Top-right (B)
      {
        x: rightX,
        y: bottomY,
        width: thickness,
        height: hieghtLength,
      }, // edge-Bottom-right (C)
      {
        x: thickness,
        y: height - thickness,
        width: length,
        height: thickness,
      }, // edge-Bottom (D)
      { x: leftX, y: bottomY, width: thickness, height: hieghtLength },
      // edge-Bottom-left (E)
      { x: leftX, y: topY, width: thickness, height: hieghtLength },
      // edge-Top-left (F)
      {
        x: thickness,
        y: height / 2 - thickness / 2,
        width: length,
        height: thickness,
      }, // edge-Middle (G)
      {
        x: rightX,
        y: 0,
        width: thickness,
        height: thickness,
      }, // vertex-right-top (H)
      {
        x: rightX,
        y: height / 2 - thickness / 2,
        width: thickness,
        height: thickness,
      }, // vertex-right-middle (I)
      {
        x: rightX,
        y: height - thickness,
        width: thickness,
        height: thickness,
      }, // vertex-right-bottom (J)
      {
        x: leftX,
        y: height - thickness,
        width: thickness,
        height: thickness,
      }, // vertex-left-bottom (K)
      {
        x: leftX,
        y: height / 2 - thickness / 2,
        width: thickness,
        height: thickness,
      }, // vertex-left-middle (L)
      {
        x: leftX,
        y: 0,
        width: thickness,
        height: thickness,
      }, // vertex-left-top (M)
    ];

    // Clear previous SVG content
    svg.selectAll('*').remove();

    // Render each segment
    segments.forEach((segment, i) => {
      svg
        .append('rect')
        .attr('x', segment.x)
        .attr('y', segment.y)
        .attr('width', segment.width)
        .attr('height', segment.height)
        .attr('rx', 0)
        .attr('ry', 0)
        .style('fill', segmentMap[value]?.[i] ? colorOn : colorOff);
    });
  }, [value, width, color, thickness, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default SevenSegment;
