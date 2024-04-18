import React from 'react';

import Divider from '../divider/Divider';
import { Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function CustomerOrderLocationInfo({ name, email, phone, address1, address2, city, zip, country, translate, ready }) {
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography text={ready ? translate('orders.orderDetailSections.contactInformation') : 'Contact information'} variant="body2" color="text.primary" fontWeight={600} />
          <Divider orientation="horizontal" variant="fullWidth" />
        </Stack>
        <Stack spacing={1}>
          <Typography text={name} variant="body2" color="text.secondary" />
          <Typography text={email || 'No email provided'} variant="body2" color="text.secondary" />
          <Typography text={phone || 'No phone provided'} variant="body2" color="text.secondary" />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography text={ready ? translate('orders.orderDetailSections.shippingAddress') : 'Shipping address'} variant="body2" color="text.primary" fontWeight={600} />
          <Divider orientation="horizontal" variant="fullWidth" />
        </Stack>
        <Stack spacing={1}>
          <Typography text={address1} variant="body2" color="text.secondary" />
          {address2 && <Typography text={address2} variant="body2" color="text.secondary" />}
          <Typography text={`${city} ${zip}`} variant="body2" color="text.secondary" />
          <Typography text={country} variant="body2" color="text.secondary" />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CustomerOrderLocationInfo;
