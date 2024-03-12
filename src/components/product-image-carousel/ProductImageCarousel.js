'use client';

import React from 'react';

import { Carousel } from 'react-bootstrap';

import BoostrapCarousel from '../boostrap-carousel/BoostrapCarousel';
import Image from '../image/Image';
import { Grid } from '../mui-components/MuiComponents';

function ProductImageCarousel({ productImages, productImageCarouselindex, onSelectProductImageCarouselindex, onProductImageChange }) {
  const boostrapCarouselProps = {
    autoPlay: false,
    customIndicators: true,
    handleSelect: onSelectProductImageCarouselindex,
    hideIndicators: false,
    index: productImageCarouselindex,
    showArrows: false,
  };

  return (
    <BoostrapCarousel {...boostrapCarouselProps}>
      {React.Children.toArray(
        productImages.map((images) => (
          <Carousel.Item interval={4000}>
            <Grid container>
              {React.Children.toArray(
                images?.map((image) => (
                  <Grid item xs={4} p={2} mb={4} onClick={() => onProductImageChange(image.url)}>
                    <Image
                      height={140}
                      src={image.url}
                      alt={image.altText || 'Product Image'}
                      objectFit="contain"
                      sizes="(max-width: 600px) 29px,
                             (max-width: 900px) 59px,
                             88px"
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Carousel.Item>
        ))
      )}
    </BoostrapCarousel>
  );
}

export default React.memo(ProductImageCarousel);
