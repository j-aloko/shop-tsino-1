import React from 'react';

import PATH from '../../constant/paths';
import Image from '../image/Image';
import { Box, Grid, Stack } from '../mui-components/MuiComponents';
import RouterButton from '../router-button/RouterButton';
import Typography from '../typography/Typography';

const CaptionBox = ({ handle, title, description, slogan, translate, ready }) => (
  <Grid item sm={6.5} xs={12} py={{ sm: 10, xs: 2 }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: { sm: 'flex-start', xs: 'center' },
        p: 1,
      }}>
      <Stack spacing={2} alignItems={{ sm: 'start', xs: 'center' }}>
        <Typography text={slogan} variant="h1" color="secondary" textAlign="center" />
        <Typography text={title} variant="h2" color="primary" textAlign="center" fontWeight={600} />
        <Typography
          text={description.length > 225 ? `${description.substring(0, 222)}...` : description}
          variant="body1"
          color="secondary"
          style={{ display: { sm: 'block', xs: 'none' }, textAlign: { sm: 'start', xs: 'center' } }}
        />
        <Box zIndex={2}>
          <RouterButton path={`${PATH.products}/${handle}`} name={ready ? translate('buttons.shopNow') : 'Shop now'} color="secondary" size="medium" />
        </Box>
      </Stack>
    </Box>
  </Grid>
);

const ImageBox = ({ featuredImage: { url }, title, isTabletOrSmaller }) => (
  <Grid item sm={5.5} xs={12} p={5}>
    <Image
      height={isTabletOrSmaller ? '40vh' : '60vh'}
      src={url}
      alt={title}
      objectFit="contain"
      priority
      quality={75}
      sizes="(max-width: 600px) 111px,
       (max-width: 900px) 222px,
       370px"
    />
  </Grid>
);

const ContentBox = ({ isEvenIndex, isTabletOrSmaller, featuredImage, title, handle, description, slogan, translate, ready }) => {
  const components = [
    <ImageBox key="imageBox" featuredImage={featuredImage} title={title} isTabletOrSmaller={isTabletOrSmaller} />,
    <CaptionBox key="captionBox" title={title} handle={handle} description={description} slogan={slogan} translate={translate} ready={ready} />,
  ];

  if (isTabletOrSmaller || isEvenIndex) {
    return components;
  }

  return components.reverse();
};

function FeaturedProduct({ handle, title, featuredImage, metafields, isTabletOrSmaller, index, translate, ready }) {
  const isEvenIndex = index % 2 === 0;

  return (
    <Grid container mb={4} px={{ md: 7, sm: 3, xs: 0 }}>
      <ContentBox
        isEvenIndex={isEvenIndex}
        isTabletOrSmaller={isTabletOrSmaller}
        featuredImage={featuredImage}
        title={title}
        handle={handle}
        description={metafields?.find((metafield) => metafield?.key === 'summary')?.value || ''}
        slogan={metafields?.find((metafield) => metafield?.key === 'slogan')?.value || ''}
        translate={translate}
        ready={ready}
      />
    </Grid>
  );
}

export default FeaturedProduct;
