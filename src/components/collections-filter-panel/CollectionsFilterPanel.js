import React from 'react';

import { alpha } from '../../mui-styles/muiStyles';
import Accordion from '../accordion/Accordion';
import ActionButton from '../action-button/ActionButton';
// import AvailabilityFilter from '../availability-filter/AvailabilityFilter';
import Divider from '../divider/Divider';
import ListItemText from '../list-item-text/ListItemText';
import { Box, Stack } from '../mui-components/MuiComponents';
import PriceRangeFilter from '../price-range-filter/PriceRangeFilter';
import Typography from '../typography/Typography';

function CollectionsList({ collections, onCollectionChange, translate, ready }) {
  return (
    <Box>
      {collections?.length > 0 ? (
        <>
          {React.Children.toArray(
            collections?.map((collection) => (
              <ListItemText
                text={collection.title}
                textStyle={(theme) => ({ color: theme.palette.text.secondary })}
                eventHandlerArgs={[collection.handle]}
                onListItemTextClick={onCollectionChange}
              />
            ))
          )}
        </>
      ) : (
        <ListItemText text={ready ? translate('collections.noCollection') : 'No collections in this store'} textStyle={(theme) => ({ color: theme.palette.text.secondary })} />
      )}
    </Box>
  );
}

function CollectionsFilterPanel({
  collections,
  //  availability,
  handleClearFilters,
  handleCollectionChange,
  // handleAvailabilityChange,
  handlePriceRangeChange,
  isFilterInUrl,
  maxPrice,
  priceRange,
  ready,
  shopInfo,
  translate,
}) {
  /* const availabilityFilterProps = {
    availability,
    handleAvailabilityChange,
  }; */

  const priceRangeFilterProps = {
    currencyCode: shopInfo.currencyCode,
    handlePriceRangeChange,
    maxPrice,
    priceRange,
  };

  return (
    <Box sx={(theme) => ({ border: 1, borderColor: theme.palette.grey[200] })}>
      <Stack spacing={2}>
        {isFilterInUrl ? (
          <Box p={2}>
            <ActionButton name={ready ? translate('buttons.clearAll') : 'Clear all'} color="primary" size="medium" onButtonClick={handleClearFilters} />
          </Box>
        ) : null}
        <Box>
          <Accordion
            accordionStyle={() => ({ boxShadow: 'none' })}
            accordionSummaryStyle={(theme) => ({ backgroundColor: alpha(theme.palette.grey[400], 0.15) })}
            accordionTitleComponent={
              <Typography text={ready ? translate('collections.shopByCollections') : 'Shop By Collections'} variant="subtitle1" color="primary" fontWeight={600} />
            }
            accordionDetailsComponent={<CollectionsList collections={collections} onCollectionChange={handleCollectionChange} ready={ready} translate={translate} />}
          />
        </Box>
        <Box sx={(theme) => ({ backgroundColor: alpha(theme.palette.grey[400], 0.15), p: 2 })}>
          <Typography text={ready ? translate('collections.filterBy') : 'Filter by'} variant="subtitle1" color="primary" fontWeight={600} />
        </Box>
        <Stack spacing={3}>
          <Stack spacing={6} p={2}>
            <Typography text={ready ? translate('collections.priceRange') : 'Price range'} variant="body2" color="primary" fontWeight={600} />
            <PriceRangeFilter {...priceRangeFilterProps} />
          </Stack>
          <Divider orientation="horizontal" variant="fullWidth" />
        </Stack>
        <Stack spacing={2}>
          {/* This feature allows users to filter products based on their stock status.
            However, at present, only products that are in stock are being displayed. */}

          {/* <Stack spacing={1} p={2}>
            <Typography text="Availability" variant="body2" color="primary" fontWeight={600} />
            <AvailabilityFilter {...availabilityFilterProps} />
          </Stack> */}
          <Divider orientation="horizontal" variant="fullWidth" />
        </Stack>
      </Stack>
    </Box>
  );
}

export default React.memo(CollectionsFilterPanel);
