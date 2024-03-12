'use client';

import React, { useState } from 'react';

import Image from 'next/image';

function ImageMagnifier({ src, alt, width: imgWidthProp, height: imgHeightProp, objectFit = 'contain', magnifierHeight = 200, magnifieWidth = 200, zoomLevel = 2.5 }) {
  const [[cursorX, cursorY], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        height: imgHeightProp,
        position: 'relative',
        width: imgWidthProp,
      }}>
      <Image
        src={src}
        fill
        placeholder="blur"
        blurDataURL={src}
        quality={70}
        priority
        sizes="(max-width: 600px) 123px,
               (max-width: 900px) 246px,
               370px"
        style={{ objectFit }}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
        alt={alt}
      />

      <div
        style={{
          backgroundColor: 'white',

          backgroundImage: `url('${src}')`,

          // calculete position of zoomed image.
          backgroundPositionX: `${-cursorX * zoomLevel + magnifieWidth / 2}px`,

          backgroundPositionY: `${-cursorY * zoomLevel + magnifierHeight / 2}px`,

          backgroundRepeat: 'no-repeat',

          // calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

          // reduce opacity so you can verify position
          border: '1px solid lightgray',

          display: showMagnifier ? '' : 'none',

          // set size of magnifier
          height: `${magnifierHeight}px`,

          left: `${cursorX - magnifieWidth / 2}px`,

          opacity: '1',

          // prevent maginier blocks the mousemove event of img
          pointerEvents: 'none',

          position: 'absolute',

          // move element center to cursor pos
          top: `${cursorY - magnifierHeight / 2}px`,

          width: `${magnifieWidth}px`,
        }}
      />
    </div>
  );
}

export default ImageMagnifier;
