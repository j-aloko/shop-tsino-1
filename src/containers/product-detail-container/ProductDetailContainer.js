import React, { useCallback, useMemo, useReducer } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Stack } from '../../components/mui-components/MuiComponents';
import { useTheme } from '../../mui-styles/muiStyles';
import { addToCart, buyNow } from '../../services/redux/slices/cart-slice/cartSlice';
import { selecBuyNowLoading, selectAddCartLoading } from '../../services/redux/slices/cart-slice/selectors';
import { selectShopInfo } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { chunkArray } from '../../utils/chunkArray';
import { createUrl } from '../../utils/createUrl';
import { extractId } from '../../utils/extractId';

const ProductDetail = dynamic(() => import('../../components/product-detail/ProductDetail'), { ssr: true });
const ProductInformationPanel = dynamic(() => import('../../components/product-information-panel/ProductInformationPanel'), { ssr: false });
const ProductDescriptionTabContainer = dynamic(() => import('../product-description-tab-container/ProductDescriptionTabContainer'), { ssr: false });
const ProductReviewTabContainer = dynamic(() => import('../product-review-tab-container/ProductReviewTabContainer'), { ssr: false });

function reducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, selectedProductImage: action.payload };
    case 'SET_OPTION':
      return { ...state, selectedOptions: { ...state.selectedOptions, [action.payload.optionName]: action.payload.optionValue } };
    case 'SET_VARIANT':
      return { ...state, selectedVariant: action.payload };
    case 'SET_QUANTITY_CHANGE':
      return { ...state, productCount: action.payload };
    case 'SET_CAROUSEL_INDEX':
      return { ...state, productImageCarouselindex: action.payload };
    case 'SET_TAB_VALUE':
      return { ...state, tabValue: action.payload };
    default:
      throw new Error();
  }
}

function ProductDetailContainer({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const theme = useTheme();
  const dispatch = useDispatch();
  const shopInfo = useSelector(selectShopInfo);
  const buyNowLoading = useSelector(selecBuyNowLoading);
  const addToCartPending = useSelector(selectAddCartLoading);

  const { t: translate, ready } = useTranslation('common');

  const initialState = useMemo(() => {
    const initialSelectedVariant = product.variants?.find((variant) => extractId(variant.id) === searchParams.get('variant')) || product.variants[0] || {};
    const initialProductImage = initialSelectedVariant?.image?.url || product?.images[0]?.url;

    return {
      productCount: 1,
      productImageCarouselindex: 0,
      selectedProductImage: initialProductImage,
      selectedVariant: initialSelectedVariant,
      tabValue: 0,
    };
  }, [product?.images, product.variants, searchParams]);

  const [state, localDispatch] = useReducer(reducer, initialState);

  const ageRangeMetafield = product.metafields?.find((metafield) => metafield?.key === 'age_range');
  const skillLevelMetafield = product.metafields?.find((metafield) => metafield?.key === 'skill_level');
  const wheelSizeMetafield = product.metafields?.find((metafield) => metafield?.key === 'wheel_size');

  const productSpecifications = useMemo(
    () => [
      { spec: 'Brand', value: product?.vendor || '' },
      ...state.selectedVariant.selectedOptions.map((option) => ({
        spec: option?.name,
        value: option?.value,
      })),
      { spec: 'Age Range', value: ageRangeMetafield?.value || '' },
      { spec: 'Skill Level', value: skillLevelMetafield?.value || '' },
      { spec: 'Wheel Size', value: wheelSizeMetafield?.value || '' },
    ],
    [product?.vendor, state.selectedVariant.selectedOptions, ageRangeMetafield?.value, skillLevelMetafield?.value, wheelSizeMetafield?.value]
  );

  const productInfoTabs = useMemo(
    () => [
      {
        PanelComponent: <ProductDescriptionTabContainer description={product.descriptionHtml || ''} />,
        id: 0,
        tab: `${ready ? translate('productDetails.productDetailsHeaders.description') : 'Description'}`,
      },
      {
        PanelComponent: (
          <ProductReviewTabContainer
            translate={translate}
            ready={ready}
            productId={product.id}
            productReviews={product.metafields?.find((metafield) => metafield?.key === 'reviews')?.value || ''}
          />
        ),
        id: 1,
        tab: `${ready ? translate('productDetails.productDetailsHeaders.reviews') : 'Reviews'}`,
      },
    ],
    [product.descriptionHtml, product.id, product.metafields, ready, translate]
  );

  const handleProductImageChange = useCallback(
    (img) => {
      const newVariant = product.variants?.find((variant) => variant.image.url === img);

      if (newVariant) {
        localDispatch({ payload: newVariant, type: 'SET_VARIANT' });
        localDispatch({ payload: img, type: 'SET_IMAGE' });

        const optionSearchParams = new URLSearchParams(searchParams.toString());
        optionSearchParams.set('variant', extractId(newVariant.id));
        const optionUrl = createUrl(pathname, optionSearchParams);
        router.replace(optionUrl, { scroll: false, shallow: true });
      } else {
        localDispatch({ payload: img, type: 'SET_IMAGE' });
      }
    },
    [product.variants, router, pathname, searchParams]
  );

  const handleOptionChange = useCallback(
    (optionName, value) => {
      const newVariant = product.variants?.find((variant) =>
        variant.selectedOptions.every(
          (opt) =>
            (opt.name !== optionName && opt.value === state.selectedVariant.selectedOptions.find((o) => o.name === opt.name).value) ||
            (opt.name === optionName && opt.value === value)
        )
      );

      if (newVariant) {
        localDispatch({ payload: newVariant, type: 'SET_VARIANT' });
        if (newVariant?.image?.url) {
          localDispatch({ payload: newVariant.image.url, type: 'SET_IMAGE' });
        }
        const optionSearchParams = new URLSearchParams(searchParams.toString());
        optionSearchParams.set('variant', extractId(newVariant.id));
        const optionUrl = createUrl(pathname, optionSearchParams);
        router.replace(optionUrl, { scroll: false, shallow: true });
      } else {
        // If the selected combination doesn't exist, find the first variant that matches the selected option
        const fallbackVariant = product.variants?.find((variant) => variant.selectedOptions.some((opt) => opt.name === optionName && opt.value === value));
        if (fallbackVariant) {
          localDispatch({ payload: fallbackVariant, type: 'SET_VARIANT' });
          if (fallbackVariant?.image?.url) {
            localDispatch({ payload: fallbackVariant.image.url, type: 'SET_IMAGE' });
          }
          const optionSearchParams = new URLSearchParams(searchParams.toString());
          optionSearchParams.set('variant', extractId(fallbackVariant.id));
          const optionUrl = createUrl(pathname, optionSearchParams);
          router.replace(optionUrl, { scroll: false, shallow: true });
        }
      }
    },
    [product.variants, router, pathname, searchParams, state.selectedVariant.selectedOptions]
  );

  const handleProductQuantityChange = useCallback(
    (operation) => {
      if (operation === 'add') {
        localDispatch({ payload: state.productCount + 1, type: 'SET_QUANTITY_CHANGE' });
      } else if (operation === 'subtract' && state.productCount > 1) {
        localDispatch({ payload: state.productCount - 1, type: 'SET_QUANTITY_CHANGE' });
      }
    },
    [state.productCount]
  );

  const handleAddProductToCart = useCallback(async () => {
    const { toast } = await import('react-toastify');
    const payload = { quantity: state.productCount, selectedVariantId: state.selectedVariant.id };
    const action = 'add';
    dispatch(addToCart({ action, payload, toast }));
  }, [dispatch, state.productCount, state.selectedVariant.id]);

  const handleBuyProductNow = useCallback(async () => {
    const { toast } = await import('react-toastify');
    const payload = { quantity: state.productCount, selectedVariantId: state.selectedVariant.id };
    const action = 'add';
    dispatch(buyNow({ action, payload, router, toast }));
  }, [dispatch, router, state.productCount, state.selectedVariant.id]);

  const handleSelectProductImageCarouselindex = useCallback((selectedIndex) => {
    localDispatch({ payload: selectedIndex, type: 'SET_CAROUSEL_INDEX' });
  }, []);

  const handleTabValueChange = useCallback((event, newValue) => {
    localDispatch({ payload: newValue, type: 'SET_TAB_VALUE' });
  }, []);

  const handleTabIndexChange = useCallback((index) => {
    localDispatch({ payload: index, type: 'SET_TAB_VALUE' });
  }, []);

  const productDetailsProps = {
    addToCartPending,
    buyNowLoading,
    handleAddProductToCart,
    handleBuyProductNow,
    handleOptionChange,
    handleProductImageChange,
    handleProductQuantityChange,
    handleSelectProductImageCarouselindex,
    product,
    productCount: state.productCount,
    productImageCarouselindex: state.productImageCarouselindex,
    productImages: chunkArray(product.images || [], 3),
    productSpecifications,
    ready,
    selectedProductImage: state.selectedProductImage,
    selectedVariant: state.selectedVariant,
    shopInfo,
    translate,
  };

  const productInfoPanelProps = {
    onTabIndexChange: handleTabIndexChange,
    onTabValueChange: handleTabValueChange,
    tabList: productInfoTabs,
    tabValue: state.tabValue,
    theme,
  };

  return (
    <Stack spacing={5}>
      <ProductDetail {...productDetailsProps} />
      <ProductInformationPanel productInfoPanelProps={productInfoPanelProps} />
    </Stack>
  );
}

export default ProductDetailContainer;
