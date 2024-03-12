import React from 'react';

import Image from '../image/Image';
import { Box } from '../mui-components/MuiComponents';
import Tooltip from '../tooltip/Tooltip';

function PaymentMethodLogo({ img, title }) {
  return (
    <Tooltip title={title} placement="top-start">
      <Box bgcolor="background.paper" boxShadow={24} borderRadius={0.5} p={0.5} sx={{ cursor: 'pointer' }}>
        <Image
          height={20}
          width={40}
          src={img}
          alt={title}
          objectFit="contain"
          sizes="(max-width: 600px) 23px,
                 (max-width: 900px) 47px,
                 70px"
        />
      </Box>
    </Tooltip>
  );
}

export default PaymentMethodLogo;
