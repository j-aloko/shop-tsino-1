import React, { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import Modal from '../../components/modal/Modal';
import ShopifyPreviewAuthModal from '../../components/shopify-preview-auth-modal/ShopifyPreviewAuthModal';
import { MODAL_TYPE } from '../../constant/modal';
import { selectCart } from '../../services/redux/slices/cart-slice/selectors';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectShopifyPreviewAuthModal } from '../../services/redux/slices/modal-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

const modalStyle = {
  bgcolor: 'background.paper',
  boxShadow: 24,
  left: '50%',
  maxWidth: '100%',
  p: 2,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: { sm: 400, xs: '100%' },
};

function ShopifyPreviewAuthModalContainer() {
  const { t: translate, ready } = useTranslation('common');

  const dispatch = useDispatch();
  const shopifyPreviewAuthModal = useSelector(selectShopifyPreviewAuthModal);
  const cart = useSelector(selectCart);

  const checkoutUrl = cart?.checkoutUrl || '';

  const handleToggleShopifyPreviewAuthModal = useCallback(() => {
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.shopifyPreviewAuth }));
  }, [dispatch]);

  const modalProps = {
    modalStyle,
    onCloseModal: handleToggleShopifyPreviewAuthModal,
    open: shopifyPreviewAuthModal,
  };

  const shopifyPreviewAuthModalProps = {
    buttonName: `${ready ? translate('buttons.checkout') : 'Checkout'}`,
    checkoutUrl,
    onToggleShopifyPreviewAuthModal: handleToggleShopifyPreviewAuthModal,
    subtitle: `${ready ? translate('modals.shopifyPreviewAuthModal.subtitle') : 'We apologize for this inconvenience!'}`,
    title: `${ready ? translate('modals.shopifyPreviewAuthModal.title') : "To proceed with the checkout test demo, please enter '1' as your password."}`,
  };

  return (
    <Modal {...modalProps}>
      <ShopifyPreviewAuthModal {...shopifyPreviewAuthModalProps} />
    </Modal>
  );
}

export default ShopifyPreviewAuthModalContainer;
