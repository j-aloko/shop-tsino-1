import React from 'react';

import { Stack } from '../mui-components/MuiComponents';
import RouterButton from '../router-button/RouterButton';
import Typography from '../typography/Typography';

function ShopifyPreviewAuthModal({ buttonName, checkoutUrl, onToggleShopifyPreviewAuthModal, subtitle, title }) {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography text={title} variant="h5" color="primary" textAlign="center" />
      <Typography text={subtitle} variant="subtitle1" color="text.secondary" textAlign="center" />
      <RouterButton path={checkoutUrl} name={buttonName} color="secondary" size="medium" onButtonClick={onToggleShopifyPreviewAuthModal} />
    </Stack>
  );
}

export default ShopifyPreviewAuthModal;
