'use client';

import React, { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import ActionButton from '../../components/action-button/ActionButton';
import DrawerCartItem from '../../components/drawer-cart-item/DrawerCartItem';
import Drawer from '../../components/drawer/Drawer';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import { AddShoppingCartIcon } from '../../components/mui-icons/muiIcons';
import RouterButton from '../../components/router-button/RouterButton';
import ScrollableBox from '../../components/scrollable-box/ScrollableBox';
import Typography from '../../components/typography/Typography';
import { DRAWER_TYPE } from '../../constant/drawer';
import { MODAL_TYPE } from '../../constant/modal';
import PATH from '../../constant/paths';
import { alpha } from '../../mui-styles/muiStyles';
import { RemoveCartItem, UpdateCartItemQuantity } from '../../services/redux/slices/cart-slice/cartSlice';
import { selectCart, selectRemoveCartLoading, selectUpdateCartLoading } from '../../services/redux/slices/cart-slice/selectors';
import { drawerSlice } from '../../services/redux/slices/drawer-slice/drawerSlice';
import { selectAnchor, selectCartDrawer } from '../../services/redux/slices/drawer-slice/selectors';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectShopInfo } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

function DrawerCartItemsContainer() {
  const dispatch = useDispatch();
  const shopInfo = useSelector(selectShopInfo);
  const cart = useSelector(selectCart);
  const updateCartItemloading = useSelector(selectUpdateCartLoading);
  const removeCartItemloading = useSelector(selectRemoveCartLoading);
  const cartDrawer = useSelector(selectCartDrawer);
  const anchor = useSelector(selectAnchor);

  const { t: translate, ready } = useTranslation('common');

  const cartItems = cart?.lineItems || [];

  const cartSubtotal = +(cart?.subtotalAmount?.amount ?? 0.0);
  const cartSubtotalCurrency = cart?.subtotalAmount?.currencyCode || shopInfo.currencyCode;

  const cartTotalTaxAmount = +(cart?.totalTaxAmount?.amount ?? 0.0);
  const cartTotalTaxAmountCurrency = cart?.totalTaxAmount?.currencyCode || cart?.subtotalAmount?.currencyCode || shopInfo.currencyCode;

  const cartTotalAmount = +(cart?.totalAmount?.amount ?? 0.0);
  const cartTotalAmountCurrency = cart?.totalAmount?.currencyCode || shopInfo.currencyCode;

  let totalCartDiscount = 0.0;
  let totalCartDiscountCurrency = cart?.subtotalAmount?.currencyCode || shopInfo.currencyCode;
  if (cart.discountAllocations.length > 0) {
    totalCartDiscount = cart.discountAllocations.reduce((total, item) => total + parseFloat(item.discountedAmount.amount), 0);
    totalCartDiscountCurrency = cart.discountAllocations[0].discountedAmount.currencyCode;
  }

  let totalProductDiscounts = 0.0;
  let totalProductDiscountsCurrency = cart?.subtotalAmount?.currencyCode || shopInfo.currencyCode;
  cart.lineItems.forEach((lineItem) => {
    if (lineItem.discountAllocations.length > 0) {
      totalProductDiscounts += lineItem.discountAllocations.reduce((total, item) => total + parseFloat(item.discountedAmount.amount), 0);
      totalProductDiscountsCurrency = cart.lineItems[0].discountAllocations[0].discountedAmount.currencyCode;
    }
  });

  const isCartBeingModified =
    (Object.keys(updateCartItemloading).length > 0 && Object.values(updateCartItemloading).includes(true)) ||
    (Object.keys(removeCartItemloading).length > 0 && Object.values(removeCartItemloading).includes(true));

  const handleToggleCartDrawer = useCallback(() => {
    if (!isCartBeingModified) {
      dispatch(drawerSlice.actions.toggleDrawer({ anchor: 'right', type: DRAWER_TYPE.cart }));
    }
  }, [dispatch, isCartBeingModified]);

  const handleProductQuantityChange = useCallback(
    async (id, operation) => {
      const { toast } = await import('react-toastify');
      dispatch(UpdateCartItemQuantity({ id, operation, toast }));
    },
    [dispatch]
  );

  const handleRemoveCartItem = useCallback(
    async (id) => {
      const { toast } = await import('react-toastify');
      dispatch(RemoveCartItem({ action: 'remove', payload: { lineId: id }, toast }));
    },
    [dispatch]
  );

  const handleToggleShopifyPreviewAuthModal = useCallback(() => {
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.shopifyPreviewAuth }));
  }, [dispatch]);

  return (
    <Drawer anchor={anchor} open={cartDrawer} onToggleDrawer={handleToggleCartDrawer} isModifyingItem={isCartBeingModified}>
      {!cartItems?.length ? (
        <Stack spacing={2} alignItems="center" justifyContent="center" height="75vh">
          <AddShoppingCartIcon color="secondary" fontSize="large" sx={{ height: 60, width: 60 }} />
          <Typography text="Your cart is empty" variant="body2" color="text.secondary" />
          <RouterButton path={PATH.collections} name="Shop More" color="secondary" size="medium" fullWidth={false} onButtonClick={handleToggleCartDrawer} />
        </Stack>
      ) : (
        <Stack>
          <ScrollableBox height="42vh">
            <Stack spacing={1} p={{ sm: 0, xs: 2 }}>
              {React.Children.toArray(
                cartItems?.map((cartItem) => (
                  <Box boxShadow={1} borderRadius={2} p={1}>
                    <DrawerCartItem
                      onProductQuantityChange={handleProductQuantityChange}
                      onRemoveCartItem={handleRemoveCartItem}
                      cartItem={cartItem}
                      updateCartItemloading={updateCartItemloading}
                      removeCartItemloading={removeCartItemloading}
                    />
                  </Box>
                ))
              )}
            </Stack>
          </ScrollableBox>
          <Stack
            spacing={1}
            position="absolute"
            left={0}
            bottom={0}
            width="100%"
            boxShadow={1}
            borderRadius={2}
            p={3}
            sx={(theme) => ({ backgroundColor: alpha(theme.palette.secondary.light, 0.15) })}>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography
                text={ready ? translate('cart.lineItems.totalProductsDiscount') : 'Total Product Discounts'}
                variant="subtitle2"
                color="primary"
                fontWeight={600}
                style={{ lineHeight: 1.57 }}
              />
              <Typography
                text={`${totalProductDiscountsCurrency}${totalProductDiscounts.toFixed(2)}`}
                variant="body2"
                color="primary"
                fontWeight={600}
                style={{ lineHeight: 1.57 }}
              />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography text={ready ? translate('cart.lineItems.subtotal') : 'Subtotal'} variant="subtitle2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
              <Typography text={`${cartSubtotalCurrency}${cartSubtotal.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography
                text={ready ? translate('cart.lineItems.totalCartDiscount') : 'Total cart discount'}
                variant="subtitle2"
                color="primary"
                fontWeight={600}
                style={{ lineHeight: 1.57 }}
              />
              <Typography text={`${totalCartDiscountCurrency}${totalCartDiscount.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography text={ready ? translate('cart.lineItems.tax') : 'Tax'} variant="subtitle2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
              <Typography text={`${cartTotalTaxAmountCurrency}${cartTotalTaxAmount.toFixed(2)}`} variant="subtitle2" color="body2" fontWeight={600} style={{ lineHeight: 1.57 }} />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography text={ready ? translate('cart.lineItems.shipping') : 'Shipping'} variant="subtitle2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
              <Typography
                text={ready ? translate('cart.lineItems.calculatedAtCheckout') : 'Calculated at checkout'}
                variant="body2"
                color="primary"
                fontWeight={600}
                style={{ lineHeight: 1.57 }}
              />
            </Box>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography text={ready ? translate('cart.lineItems.total') : 'Total'} variant="subtitle2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
              <Typography text={`${cartTotalAmountCurrency}${cartTotalAmount.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
            </Box>
            <Grid container spacing={1} display="flex" alignItems="flex-end">
              <Grid item xs={12}>
                <RouterButton
                  path={PATH.cart}
                  name={ready ? translate('buttons.expandCart') : 'Expand Cart'}
                  color="secondary"
                  size="medium"
                  fullwidth
                  disabled={isCartBeingModified || !cartItems?.length}
                  onButtonClick={handleToggleCartDrawer}
                />
              </Grid>
              <Grid item xs={12}>
                <ActionButton
                  name={ready ? translate('buttons.checkout') : 'Checkout'}
                  color="primary"
                  size="medium"
                  fullwidth
                  disabled={isCartBeingModified || !cartItems?.length}
                  onButtonClick={handleToggleShopifyPreviewAuthModal}
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

export default DrawerCartItemsContainer;
