'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import AppBar from '../../components/app-bar/AppBar';
import { Box } from '../../components/mui-components/MuiComponents';
import { DISCOUNT_STATUS } from '../../constant/shopify';
import { useTheme } from '../../mui-styles/muiStyles';
import { selectAutomaticDiscountBasic } from '../../services/redux/slices/discounts-slice/selectors';
import { selectAvailableLanguages, selectAvailableCountries, selectSelectedLanguage, selectSelectedCountry } from '../../services/redux/slices/shop-info-slice/selectors';
import { shopInfoSlice } from '../../services/redux/slices/shop-info-slice/shopInfoSlice';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { createUrl } from '../../utils/createUrl';

const dropdownSelectorStyle = (theme) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '& .MuiSelect-icon': {
    color: 'primary.contrastText',
  },
  '& .MuiSelect-root': {
    boxShadow: 'none',
  },
  '& .MuiSelect-select': {
    fontWeight: 600,
  },
  color: 'primary.contrastText',
  ...theme.typography.body2,
});

const LatestDeal = dynamic(() => import('../../components/latest-deal/LatestDeal'), { ssr: false });
const DropdownSelector = dynamic(() => import('../../components/dropdown-selector/DropdownSelector'), { ssr: false });

function HeaderContainer() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const automaticDiscountBasic = useSelector(selectAutomaticDiscountBasic);
  const availableLanguages = useSelector(selectAvailableLanguages);
  const availableCountries = useSelector(selectAvailableCountries);

  const selectedLanguage = useSelector(selectSelectedLanguage);
  const selectedCountry = useSelector(selectSelectedCountry);

  const { i18n } = useTranslation();

  const transformedAvailableLanguages = useMemo(
    () =>
      availableLanguages?.map(({ endonymName, isoCode }) => ({
        option: endonymName,
        value: isoCode,
      })),
    [availableLanguages]
  );

  const transformedAvailableCountries = useMemo(
    () =>
      availableCountries?.map(({ countryIsoCode, symbol }) => ({
        option: `${countryIsoCode} (${symbol})`,
        value: countryIsoCode,
      })),
    [availableCountries]
  );

  const handleLanguageChange = useCallback(
    async (event) => {
      const newLanguage = event.target.value;
      dispatch(shopInfoSlice.actions.selectLanguage(newLanguage));
      i18n.changeLanguage(newLanguage.toLowerCase());
      const optionSearchParams = new URLSearchParams(searchParams.toString());
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl, { scroll: false });
    },
    [dispatch, i18n, pathname, router, searchParams]
  );

  const handleCountryChange = useCallback(
    async (event) => {
      const newCountry = event.target.value;
      dispatch(shopInfoSlice.actions.selectCountry(newCountry));
      const optionSearchParams = new URLSearchParams(searchParams.toString());
      const optionUrl = createUrl(pathname, optionSearchParams);
      router.replace(optionUrl, { scroll: false });
    },
    [dispatch, pathname, router, searchParams]
  );

  return (
    <AppBar color="primary">
      <Box display="flex" alignItems="center" flexDirection={{ sm: 'row', xs: 'column' }} rowGap={1} width="100%">
        {automaticDiscountBasic?.discount?.status === DISCOUNT_STATUS.active ? (
          <Box display="flex" justifyContent={{ sm: 'flex-start', xs: 'center' }}>
            <LatestDeal title={automaticDiscountBasic.discount.title} />
          </Box>
        ) : null}

        {availableLanguages?.length > 0 && availableCountries?.length > 0 ? (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: theme.palette.primary.main,
              display: 'flex',
              flexGrow: 1,
              height: 40,
              justifyContent: { sm: 'flex-end', xs: 'center' },
              width: 'fit-content',
            }}>
            <DropdownSelector value={selectedLanguage} options={transformedAvailableLanguages} onChange={handleLanguageChange} style={dropdownSelectorStyle} />
            <Box width={2} />
            <DropdownSelector value={selectedCountry} options={transformedAvailableCountries} onChange={handleCountryChange} style={dropdownSelectorStyle} />
          </Box>
        ) : null}
      </Box>
    </AppBar>
  );
}

export default HeaderContainer;
