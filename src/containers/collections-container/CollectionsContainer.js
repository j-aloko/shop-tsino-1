'use client';

/* eslint-disable camelcase */

import React, { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import CollectionsDisplayPanel from '../../components/collections-display-panel/CollectionsDisplayPanel';
import CollectionsFilterPanel from '../../components/collections-filter-panel/CollectionsFilterPanel';
import { Box, Grid } from '../../components/mui-components/MuiComponents';
import { selectShopInfo } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { defaultSort, sorting } from '../../services/shopify/constants/constants';
import { createUrl } from '../../utils/createUrl';

function CollectionsContainer({ collections, isFilterInUrl, maxPrice, minPrice, page, totalPages, products }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { available_for_sale, price_min, price_max } = Object.fromEntries(searchParams);

  const { t: translate, ready } = useTranslation('common');

  const [availability, setAvailability] = useState({
    inStock: available_for_sale === 'true',
    outOfStock: available_for_sale === 'false',
  });

  const [priceRange, setPriceRange] = useState([price_min ? +price_min : minPrice, price_max ? +price_max : maxPrice]);

  const sortOptions = useMemo(() => sorting(ready, translate)?.map((sortObject) => ({ option: sortObject.translatedTitle, value: sortObject.title })), [ready, translate]);
  const initialSortObject = sorting(ready, translate)?.find((sortObject) => sortObject.slug === searchParams.get('sort')) || defaultSort(ready, translate);
  const [sortValue, setSortValue] = useState(initialSortObject.title);

  const shopInfo = useSelector(selectShopInfo);

  const resetQueryParams = useCallback(() => {
    setSortValue(defaultSort(ready, translate).title);
    setAvailability({
      inStock: available_for_sale === 'true',
      outOfStock: available_for_sale === 'false',
    });
    setPriceRange([+minPrice, +maxPrice]);
  }, [available_for_sale, maxPrice, minPrice, ready, translate]);

  const handleClearFilters = useCallback(() => {
    resetQueryParams();
    const optionSearchParams = new URLSearchParams();
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  }, [resetQueryParams, router, pathname]);

  const handleCollectionChange = useCallback(
    (handle) => {
      resetQueryParams();
      const optionSearchParams = new URLSearchParams();
      optionSearchParams.set('collection', handle);
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl, { scroll: false });
    },
    [resetQueryParams, router, pathname]
  );

  const handleAvailabilityChange = useCallback(
    (event) => {
      if (event.target.name === 'inStock') {
        setAvailability({
          inStock: event.target.checked,
          outOfStock: !event.target.checked,
        });
      } else if (event.target.name === 'outOfStock') {
        setAvailability({
          inStock: !event.target.checked,
          outOfStock: event.target.checked,
        });
      }

      const optionSearchParams = new URLSearchParams(searchParams.toString());
      optionSearchParams.set('available_for_sale', event.target.name === 'inStock' ? event.target.checked : !event.target.checked);
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Debounced function to update the URL
  const updateURL = useDebouncedCallback((newValue) => {
    const optionSearchParams = new URLSearchParams(searchParams.toString());
    optionSearchParams.set('price_min', newValue[0].toString());
    optionSearchParams.set('price_max', newValue[1].toString());
    const optionUrl = createUrl(pathname, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  }, 1000);

  const handlePriceRangeChange = useCallback(
    (event, newValue) => {
      setPriceRange(newValue);
      updateURL(newValue);
    },
    [updateURL]
  );

  const handleSortOrder = useCallback(
    (event) => {
      const selectedSortOption = event.target.value;
      setSortValue(selectedSortOption);

      const selectedSortObject = sorting(ready, translate)?.find((sortObject) => sortObject.title === selectedSortOption);

      const optionSearchParams = new URLSearchParams(searchParams.toString());
      optionSearchParams.set('sort', selectedSortObject.slug);

      if (optionSearchParams.get('page') && optionSearchParams.get('page') > 1) {
        optionSearchParams.set('page', '1');
      }

      const optionUrl = createUrl(pathname, optionSearchParams);

      router.replace(optionUrl, { scroll: false });
    },
    [ready, router, pathname, searchParams, translate]
  );

  const handlePaginate = useCallback(
    (event, value) => {
      const optionSearchParams = new URLSearchParams(searchParams.toString());
      optionSearchParams.set('page', value.toString());
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const collectionsFilterPanelProps = {
    availability,
    collections,
    handleAvailabilityChange,
    handleClearFilters,
    handleCollectionChange,
    handlePriceRangeChange,
    isFilterInUrl,
    maxPrice,
    priceRange,
    ready,
    router,
    shopInfo,
    translate,
  };

  const collectionsDisplayPanelProps = {
    handlePaginate,
    handleSortOrder,
    page,
    products,
    ready,
    sortOptions,
    sortValue,
    totalPages,
    translate,
  };

  return (
    <Box>
      <Grid container p={{ sm: 5, xs: 2 }}>
        <Grid item xs={12} sm={3}>
          <CollectionsFilterPanel {...collectionsFilterPanelProps} />
        </Grid>
        <Grid item xs={12} sm={9} px={{ sm: 4, xs: 0 }}>
          <CollectionsDisplayPanel {...collectionsDisplayPanelProps} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CollectionsContainer;
