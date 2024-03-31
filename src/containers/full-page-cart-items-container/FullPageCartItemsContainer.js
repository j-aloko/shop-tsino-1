'use client';

import React, { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import ActionButton from '../../components/action-button/ActionButton';
import Counter from '../../components/counter/Counter';
import FullPageCartItem from '../../components/full-page-cart-item/FullPageCartItem';
import { CircularProgress, IconButton, Stack } from '../../components/mui-components/MuiComponents';
import { RemoveShoppingCartIcon, AddShoppingCartIcon } from '../../components/mui-icons/muiIcons';
import { Container, Row, Col, Table, Card } from '../../components/react-boostrap-components/ReactBoostrapComponents';
import RouterButton from '../../components/router-button/RouterButton';
import Tooltip from '../../components/tooltip/Tooltip';
import Typography from '../../components/typography/Typography';
import { MODAL_TYPE } from '../../constant/modal';
import PATH from '../../constant/paths';
import { UpdateCartItemQuantity, RemoveCartItem } from '../../services/redux/slices/cart-slice/cartSlice';
import { selectCart, selectRemoveCartLoading, selectUpdateCartLoading } from '../../services/redux/slices/cart-slice/selectors';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectShopInfo } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

function FullPageCartItemsContainer() {
  const dispatch = useDispatch();
  const shopInfo = useSelector(selectShopInfo);
  const cart = useSelector(selectCart);
  const updateCartItemloading = useSelector(selectUpdateCartLoading);
  const removeCartItemloading = useSelector(selectRemoveCartLoading);

  const { t: translate, ready } = useTranslation('common');

  const cartItems = cart?.lineItems || [];

  const cartSubtotal = +(cart?.subtotalAmount?.amount ?? 0.0);
  const cartSubtotalCurrency = cart?.subtotalAmount?.currencyCode || shopInfo.currencyCode;

  const cartTotalTaxAmount = +(cart?.totalTaxAmount?.amount ?? 0.0);
  const cartTotalTaxAmountCurrency = cart?.totalTaxAmount?.currencyCode || shopInfo.currencyCode;

  const cartTotalAmount = +(cart?.totalAmount?.amount ?? 0.0);
  const cartTotalAmountCurrency = cart?.totalAmount?.currencyCode || shopInfo.currencyCode;

  let totalCartDiscount = 0.0;
  let cartDiscountCurrency = shopInfo.currencyCode;
  if (cart.discountAllocations.length > 0) {
    totalCartDiscount = cart.discountAllocations.reduce((total, item) => total + parseFloat(item.discountedAmount.amount), 0);
    cartDiscountCurrency = cart.discountAllocations[0].discountedAmount.currencyCode;
  }

  const isCartBeingModified =
    (Object.keys(updateCartItemloading).length > 0 && Object.values(updateCartItemloading).includes(true)) ||
    (Object.keys(removeCartItemloading).length > 0 && Object.values(removeCartItemloading).includes(true));

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
    <section className="h-100 h-custom">
      {!cartItems?.length ? (
        <Stack spacing={2} alignItems="center" justifyContent="center" height="70vh">
          <AddShoppingCartIcon color="secondary" fontSize="large" sx={{ height: 60, width: 60 }} />
          <Typography text="Your cart is empty" variant="body2" color="text.secondary" />
          <RouterButton name="Shop More" path={PATH.collections} color="secondary" size="medium" />
        </Stack>
      ) : (
        <Container className="h-100 py-5">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th className="h5">
                        <Typography text={ready ? translate('cart.dataGridHeaders.product') : 'Product'} variant="subtitle1" color="primary" fontWeight={600} />
                      </th>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <th />
                      <th>
                        <Typography text={ready ? translate('cart.dataGridHeaders.price') : 'Price'} variant="subtitle1" color="primary" fontWeight={600} />
                      </th>
                      <th>
                        <Typography text={ready ? translate('cart.dataGridHeaders.quantity') : 'Quantity'} variant="subtitle1" color="primary" fontWeight={600} />
                      </th>
                      <th>
                        <Typography text={ready ? translate('cart.dataGridHeaders.discount') : 'Discount'} variant="subtitle1" color="primary" fontWeight={600} />
                      </th>
                      <th>
                        <Typography text={ready ? translate('cart.dataGridHeaders.total') : 'Total'} variant="subtitle1" color="primary" fontWeight={600} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {React.Children.toArray(
                      cartItems?.map((cartItem) => {
                        // Calculate the total discount amount for this item
                        let totalDiscount = 0.0;
                        if (cartItem.discountAllocations.length > 0) {
                          totalDiscount = cartItem.discountAllocations.reduce((total, item) => total + parseFloat(item.discountedAmount.amount), 0);
                        }
                        return (
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <FullPageCartItem cartItem={cartItem} />
                              </div>
                            </td>
                            <td className="align-middle">
                              {removeCartItemloading[cartItem?.id] ? (
                                <CircularProgress color="secondary" size={20} />
                              ) : (
                                <Tooltip title="remove Item" placement="top-start">
                                  <IconButton aria-label="delete" onClick={() => handleRemoveCartItem(cartItem.id)}>
                                    <RemoveShoppingCartIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </td>
                            <td className="align-middle">
                              <Typography
                                text={`${cartItem.cost.amountPerQuantity.currencyCode || shopInfo.currencyCode}${cartItem.cost.amountPerQuantity.amount}`}
                                variant="body2"
                                color="primary"
                                fontWeight={600}
                                style={{ lineHeight: 1.57, opacity: 0.8 }}
                              />
                            </td>
                            <td className="align-middle">
                              <Counter
                                id={cartItem.id}
                                pending={updateCartItemloading[cartItem.id]}
                                quantity={cartItem.quantity}
                                quantityAvailable={cartItem.merchandise.quantityAvailable}
                                onQuantityChange={handleProductQuantityChange}
                              />
                            </td>
                            <td className="align-middle">
                              <Typography
                                text={`${
                                  cartItem.discountAllocations.length > 0 ? cartItem.discountAllocations[0].discountedAmount.currencyCode : shopInfo.currencyCode
                                }${totalDiscount.toFixed(2)}`}
                                variant="body2"
                                color="primary"
                                fontWeight={600}
                                style={{ lineHeight: 1.57 }}
                              />
                            </td>
                            <td className="align-middle">
                              <Typography
                                text={`${cartItem.cost.totalAmount.currencyCode || shopInfo.currencyCode}${cartItem.cost.totalAmount.amount}`}
                                variant="body2"
                                color="primary"
                                fontWeight={600}
                                style={{ lineHeight: 1.57 }}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </div>

              <Card className="shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px' }}>
                <Card.Body>
                  <Row className="justify-content-end m-md-0 m-lg-2 m-xl-3">
                    <Col lg={6} xl={3}>
                      <div className="d-flex justify-content-between">
                        <Typography text={ready ? translate('cart.lineItems.subtotal') : 'Subtotal'} variant="subtitle1" color="primary" fontWeight={600} />
                        <Typography text={`${cartSubtotalCurrency}${cartSubtotal.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} />
                      </div>
                      <div className="d-flex justify-content-between">
                        <Typography text={ready ? translate('cart.lineItems.totalCartDiscount') : 'Total cart discount'} variant="subtitle1" color="primary" fontWeight={600} />
                        <Typography text={`${cartDiscountCurrency}${totalCartDiscount.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} />
                      </div>
                      <div className="d-flex justify-content-between">
                        <Typography text={ready ? translate('cart.lineItems.tax') : 'Tax'} variant="subtitle1" color="primary" fontWeight={600} />
                        <Typography text={`${cartTotalTaxAmountCurrency}${cartTotalTaxAmount.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} />
                      </div>
                      <div className="d-flex justify-content-between">
                        <Typography text={ready ? translate('cart.lineItems.total') : 'Total'} variant="subtitle1" color="primary" fontWeight={600} />
                        <Typography text={`${cartTotalAmountCurrency}${cartTotalAmount.toFixed(2)}`} variant="body2" color="primary" fontWeight={600} />
                      </div>
                      <hr className="my-4" />
                      <Typography
                        text={`${ready ? translate('cart.lineItems.shipping') : 'Shipping'} ${ready ? translate('cart.lineItems.calculatedAtCheckout') : 'Calculated at checkout'}`}
                        variant="body2"
                        color="primary"
                      />
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between">
                        <RouterButton
                          path={PATH.collections}
                          name={ready ? translate('buttons.shopMore') : 'Shop more'}
                          color="secondary"
                          size="medium"
                          disabled={isCartBeingModified}
                        />
                        <ActionButton
                          name={ready ? translate('buttons.checkout') : 'Checkout'}
                          color="primary"
                          size="medium"
                          fullwidth
                          disabled={isCartBeingModified || !cartItems?.length}
                          onButtonClick={handleToggleShopifyPreviewAuthModal}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </section>
  );
}

export default FullPageCartItemsContainer;
