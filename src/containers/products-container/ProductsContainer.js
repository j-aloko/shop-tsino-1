'use client';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import BoostrapCarousel from '../../components/boostrap-carousel/BoostrapCarousel';
import Divider from '../../components/divider/Divider';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import ProductCard from '../../components/product-card/ProductCard';
import { Carousel } from '../../components/react-boostrap-components/ReactBoostrapComponents';
import RouterButton from '../../components/router-button/RouterButton';
import Typography from '../../components/typography/Typography';
import PATH from '../../constant/paths';
import { useTheme, useMediaQuery } from '../../mui-styles/muiStyles';
import { chunkArray } from '../../utils/chunkArray';

function ProductsContainer({ title, subtitle, products = [], isCarouselProduct = false, isViewMoreButton = true }) {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const { t: translate, ready } = useTranslation('common');

  const handleSelect = useCallback((selectedIndex) => {
    setIndex(selectedIndex);
  }, []);

  const getChunkSize = () => {
    if (isMobile) {
      return 2;
    }
    if (isTablet) {
      return 3;
    }
    return 4;
  };

  const boostrapCarouselProps = {
    autoPlay: false,
    customIndicators: true,
    handleSelect,
    index,
    showArrows: !(isMobile || isTablet),
  };

  const renderProductGrid = (productList, smValue) => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid container maxWidth="lg">
        {React.Children.toArray(
          productList.map((product) => (
            <Grid item xs={6} sm={smValue} md={3} p={2}>
              <ProductCard {...product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );

  return (
    <Stack p={2} spacing={4}>
      <Stack spacing={2} alignItems="center">
        <Typography text={title} variant="h1" color="secondary" />
        <Typography text={subtitle} variant="h2" color="primary" fontWeight={600} />
        <Divider orientation="horizontal" variant="fullWidth" color="secondary.main" height={5} width={80} />
      </Stack>
      {isCarouselProduct ? (
        <BoostrapCarousel {...boostrapCarouselProps}>
          {React.Children.toArray(
            chunkArray(products, getChunkSize()).map((productChunk) => (
              <Carousel.Item interval={4000} style={{ marginBottom: '3rem' }}>
                {renderProductGrid(productChunk, 4)}
              </Carousel.Item>
            ))
          )}
        </BoostrapCarousel>
      ) : (
        renderProductGrid(products, 3)
      )}
      {isViewMoreButton && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <RouterButton path={PATH.collections} name={ready ? translate('buttons.viewMore') : 'View More'} color="secondary" size="medium" fullWidth={false} />
        </Box>
      )}
    </Stack>
  );
}

export default React.memo(ProductsContainer);
