import React from 'react';

import CarouselArrowIcon from '../carousel-arrow-icon/CarouselArrowIcon';
import { ArrowBackIosRoundedIcon, ArrowForwardIosRoundedIcon } from '../mui-icons/muiIcons';
import { Carousel } from '../react-boostrap-components/ReactBoostrapComponents';

function BoostrapCarousel({ children, handleSelect, index, autoPlay, showArrows, customIndicators, hideIndicators }) {
  let carouselClass = '';
  if (customIndicators) {
    carouselClass = 'custom-indicators';
  }
  if (hideIndicators) {
    carouselClass += ' hide-indicators';
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={showArrows ? <CarouselArrowIcon IconComponent={ArrowForwardIosRoundedIcon} /> : null}
      prevIcon={showArrows ? <CarouselArrowIcon IconComponent={ArrowBackIosRoundedIcon} /> : null}
      className={carouselClass}
      interval={autoPlay ? 5000 : null}>
      {children}
    </Carousel>
  );
}

export default BoostrapCarousel;
