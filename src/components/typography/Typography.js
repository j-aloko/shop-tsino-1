import React from 'react';

import DOMPurify from 'isomorphic-dompurify';

import { MuiTypography } from '../mui-components/MuiComponents';

function Typography({ text, variant, color, textAlign, fontWeight, style }) {
  const sanitizedHtml = DOMPurify.sanitize(text);

  return (
    <MuiTypography
      variant={variant}
      color={color}
      textAlign={textAlign || 'left'}
      fontWeight={fontWeight || null}
      sx={style || {}}
      component="div"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default Typography;
