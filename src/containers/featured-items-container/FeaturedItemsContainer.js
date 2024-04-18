'use client';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import BoostrapCarousel from '../../components/boostrap-carousel/BoostrapCarousel';
import FeaturedItem from '../../components/featured-item/FeaturedItem';
import { Box } from '../../components/mui-components/MuiComponents';
import { Carousel } from '../../components/react-boostrap-components/ReactBoostrapComponents';
import { useTheme, useMediaQuery } from '../../mui-styles/muiStyles';

function FeaturedItemsContainer({ featuredItems }) {
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
        featuredItems.map((item, i) => (
          <Carousel.Item interval={4000}>
            <Box sx={{ background: 'background.paper', flexGrow: 1, height: 'auto', maxWidth: '100%', p: 2 }}>
              <FeaturedItem {...item} isTabletOrSmaller={isTabletOrSmaller} theme={theme} index={i} translate={translate} ready={ready} />
            </Box>
          </Carousel.Item>
        ))
      )}
    </BoostrapCarousel>
  );
}

export default FeaturedItemsContainer;
