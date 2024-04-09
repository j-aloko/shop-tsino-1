export const selectShopInfo = (state) => state.shopInfo.shop;
export const selectGetShopInfoLoading = (state) => state.shopInfo.loading;
export const selectGetShopInfoError = (state) => state.shopInfo.error;
export const selectAvailableLanguages = (state) => state.shopInfo.availableLanguages;
export const selectSelectedLanguage = (state) => state.shopInfo.selectedLanguage.isoCode;
export const selectAvailableCountries = (state) => state.shopInfo.availableCountries;
export const selectSelectedCountry = (state) => state.shopInfo.selectedCountry.isoCode;
