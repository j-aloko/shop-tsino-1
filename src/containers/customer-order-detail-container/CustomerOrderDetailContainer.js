'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';

import CustomerOrderLocationInfo from '../../components/customer-order-location-info/CustomerOrderLocationInfo';
import CustomerOrderedProductCostSummary from '../../components/customer-ordered-product-cost-summary/CustomerOrderedProductCostSummary';
import CustomerOrderedProductInfo from '../../components/customer-ordered-product-info/CustomerOrderedProductInfo';
import Divider from '../../components/divider/Divider';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import Typography from '../../components/typography/Typography';
import { orderFinancialStatusDisplayMap } from '../../constant/shopify';
import { alpha } from '../../mui-styles/muiStyles';
import { selectUser } from '../../services/redux/slices/auth-slice/selectors';
import { useSelector } from '../../services/redux/store/store';

function OrderedProduct({ lineItem }) {
  const {
    title,
    variant: {
      title: variantTitle,
      image: { url: img },
      price: { amount: amountPerQuantity, currencyCode: amountPerQuantityCurrency },
    },
    discountedTotalPrice: { amount: totalPrice, currencyCode: totalPriceCurrency },
    quantity,
  } = lineItem;

  return (
    <CustomerOrderedProductInfo
      title={title}
      img={img}
      variantTitle={variantTitle}
      quantity={quantity}
      amountPerQuantity={amountPerQuantity}
      amountPerQuantityCurrency={amountPerQuantityCurrency}
      totalPrice={totalPrice}
      totalPriceCurrency={totalPriceCurrency}
    />
  );
}

function CustomerOrderDetailContainer({ orderId }) {
  const user = useSelector(selectUser);
  const orderDetail = user?.orders?.find(({ orderNumber }) => orderNumber === orderId);

  const { ready, t: translate } = useTranslation('common');

  if (!orderDetail) return null;

  const {
    email,
    phone,
    shippingAddress: { address1, address2, city, zip, country },
    cancelReason,
    canceledAt,
    name,
    currentSubtotalPrice,
    totalShippingPrice,
    currentTotalTax,
    currentTotalPrice,
    financialStatus,
    lineItems,
  } = orderDetail;

  let subtotalAmount = null;
  let subtotalCurrencyCode = null;
  if (currentSubtotalPrice) {
    subtotalAmount = currentSubtotalPrice.amount;
    subtotalCurrencyCode = currentSubtotalPrice.currencyCode;
  }

  let shippingAmount = null;
  let shippingCurrencyCode = null;
  if (totalShippingPrice) {
    shippingAmount = totalShippingPrice.amount;
    shippingCurrencyCode = totalShippingPrice.currencyCode;
  }

  let taxAmount = null;
  let taxCurrencyCode = null;
  if (currentTotalTax) {
    taxAmount = currentTotalTax.amount;
    taxCurrencyCode = currentTotalTax.currencyCode;
  }

  let totalAmount = null;
  let totalCurrencyCode = null;
  if (currentTotalPrice) {
    totalAmount = currentTotalPrice.amount;
    totalCurrencyCode = currentTotalPrice.currencyCode;
  }

  return (
    <Box p={2}>
      <Stack spacing={4}>
        {cancelReason ? (
          <Typography
            text={
              ready
                ? translate('orders.OrderCancelledAlert', { date: new Date(canceledAt).toDateString(), name })
                : `Order ${name} cancelled on ${new Date(canceledAt).toDateString()}`
            }
            variant="h4"
            color="text.secondary"
          />
        ) : null}
        <Grid container justifyContent={{ sm: 'space-between', xs: 'flex-start' }}>
          <Grid item xs={12} sm={6.5} p={2} boxShadow={1} borderRadius={2}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography text={ready ? translate('orders.orderDetailSections.products') : 'Products'} variant="body2" color="text.primary" fontWeight={600} />
                <Divider orientation="horizontal" variant="fullWidth" />
              </Stack>
              {React.Children.toArray(
                lineItems?.map((lineItem) => (
                  <Box sx={(theme) => ({ border: 1, borderColor: alpha(theme.palette.grey[800], 0.15), borderRadius: 2, p: 1 })}>
                    <OrderedProduct key={lineItem.id} lineItem={lineItem} />
                  </Box>
                ))
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4.5} p={2} boxShadow={1} borderRadius={2} order={{ sm: 2, xs: 3 }} mt={{ sm: 0, xs: 2 }}>
            <CustomerOrderLocationInfo
              name={user?.displayName}
              email={email}
              phone={phone}
              address1={address1}
              address2={address2}
              city={city}
              zip={zip}
              country={country}
              translate={translate}
              ready={ready}
            />
          </Grid>
          <Grid item xs={12} sm={6.5} p={2} boxShadow={1} borderRadius={2} order={{ sm: 3, xs: 2 }} mt={2}>
            <Box sx={(theme) => ({ border: 1, borderColor: alpha(theme.palette.grey[800], 0.15), borderRadius: 2, p: 1 })}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography text={ready ? translate('orders.orderDetailSections.billingSummary') : 'Billing summary'} variant="body2" color="text.primary" fontWeight={600} />
                  <Divider orientation="horizontal" variant="fullWidth" />
                </Stack>
                <Stack spacing={1}>
                  <CustomerOrderedProductCostSummary title={ready ? translate('orders.lineItems.subtotal') : 'Subtotal'} currency={subtotalCurrencyCode} amount={subtotalAmount} />
                  <CustomerOrderedProductCostSummary title={ready ? translate('orders.lineItems.shipping') : 'Shipping'} currency={shippingCurrencyCode} amount={shippingAmount} />
                  <CustomerOrderedProductCostSummary title={ready ? translate('orders.lineItems.tax') : 'Tax'} currency={taxCurrencyCode} amount={taxAmount} />
                  <CustomerOrderedProductCostSummary
                    title={ready ? translate('orders.lineItems.total') : 'Total'}
                    currency={totalCurrencyCode}
                    amount={totalAmount}
                    isTitleBold
                    isAmountBold
                  />
                  <Divider orientation="horizontal" variant="fullWidth" />
                  <CustomerOrderedProductCostSummary
                    title={`${orderFinancialStatusDisplayMap[financialStatus]} ${user?.displayName}`}
                    currency={totalCurrencyCode}
                    amount={totalAmount}
                  />
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default CustomerOrderDetailContainer;
