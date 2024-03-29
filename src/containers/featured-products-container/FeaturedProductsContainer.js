'use client';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import BoostrapCarousel from '../../components/boostrap-carousel/BoostrapCarousel';
import FeaturedProduct from '../../components/featured-product/FeaturedProduct';
import { Box } from '../../components/mui-components/MuiComponents';
import { Carousel } from '../../components/react-boostrap-components/ReactBoostrapComponents';
import { alpha, useTheme, useMediaQuery } from '../../mui-styles/muiStyles';

function FeaturedProductsContainer({ featuredProducts }) {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isTabletOrSmaller = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

  const { t: translate, ready } = useTranslation('common');

  const handleSelect = useCallback((selectedIndex) => {
    setIndex(selectedIndex);
  }, []);

  const boostrapCarouselProps = { autoPlay: true, customIndicators: true, handleSelect, index, showArrows: !isTabletOrSmaller };

  return (
    <BoostrapCarousel {...boostrapCarouselProps}>
      {React.Children.toArray(
        featuredProducts.map((product, i) => (
          <Carousel.Item interval={4000}>
            <Box sx={{ background: alpha(theme.palette.secondary.light, 0.15), flexGrow: 1, height: 'auto', maxWidth: '100%', p: 2 }}>
              <FeaturedProduct {...product} isTabletOrSmaller={isTabletOrSmaller} theme={theme} index={i} translate={translate} ready={ready} />
            </Box>
          </Carousel.Item>
        ))
      )}
    </BoostrapCarousel>
  );
}

export default FeaturedProductsContainer;
