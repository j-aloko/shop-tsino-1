import React from 'react';

import Image from '../image/Image';

function Accreditation({ img, title }) {
  return <Image height={80} src={img} alt={title} objectFit="contain" />;
}

export default Accreditation;
