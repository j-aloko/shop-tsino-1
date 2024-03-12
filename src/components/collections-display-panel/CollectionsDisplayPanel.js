import React from 'react';

import DiscountBannerContainer from '../../containers/discount-banner-container/DiscountBannerContainer';
import { alpha } from '../../mui-styles/muiStyles';
import { Box, Grid, Stack } from '../mui-components/MuiComponents';
import Paginate from '../pagination/Pagination';
import ProductCard from '../product-card/ProductCard';
import ProductSortDropdown from '../product-sort-dropdown/ProductSortDropdown';

function CollectionsDisplayPanel({ handlePaginate, handleSortOrder, page, products, sortOptions, sortValue, totalPages, translate, ready }) {
  const productSortDropdownProps = {
    handleSortOrder,
    ready,
    sortOptions,
    sortValue,
    translate,
  };

  return (
    <Stack spacing={8}>
      <Stack spacing={1}>
        <DiscountBannerContainer imagePrority />
        <Box p={2} sx={(theme) => ({ backgroundColor: alpha(theme.palette.grey[500], 0.15), display: 'flex', justifyContent: 'flex-end' })}>
          <ProductSortDropdown {...productSortDropdownProps} />
        </Box>
        <Grid container>
          {React.Children.toArray(
            products?.map((product) => (
              <Grid item xs={6} sm={4} md={3} p={2}>
                <ProductCard {...product} />
              </Grid>
            ))
          )}
        </Grid>
      </Stack>
      <Paginate count={totalPages} page={page} onPaginate={handlePaginate} />
    </Stack>
  );
}

export default React.memo(CollectionsDisplayPanel);
