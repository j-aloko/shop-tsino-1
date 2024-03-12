import React from 'react';

import ActionButton from '../action-button/ActionButton';
import { Stack, Grid } from '../mui-components/MuiComponents';
import Review from '../review/Review';
import Typography from '../typography/Typography';

function ProductReviewTab({ onOpenReviewFormModal, productReviews, authenticatedUserEmail, translate, ready }) {
  return (
    <Grid container>
      <Grid item md={4} xs={12} p={2}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography text={ready ? translate('productDetails.reviewTab.title') : 'Review this product'} variant="h6" color="text.secondary" />
            <Typography text={ready ? translate('productDetails.reviewTab.subtitle') : 'Share your thoughts with other customers'} variant="body2" color="text.secondary" />
          </Stack>
          <ActionButton name={ready ? translate('buttons.writeReview') : 'Write Review'} color="secondary" size="large" onButtonClick={onOpenReviewFormModal} />
        </Stack>
      </Grid>
      <Grid item md={8} xs={12} p={2}>
        {productReviews?.length > 0 ? (
          <Stack spacing={3}>
            {React.Children.toArray(
              productReviews
                ?.reduce((acc, item) => [item, ...acc], [])
                .map((productReview) => <Review {...productReview} authenticatedUserEmail={authenticatedUserEmail} onUpdateReview={onOpenReviewFormModal} />)
            )}
          </Stack>
        ) : (
          <Typography text="Your opinion matters! Be the pioneer and share your thoughts about this product.😊" variant="h6" color="text.secondary" style={{ maxWidth: 'sm' }} />
        )}
      </Grid>
    </Grid>
  );
}

export default React.memo(ProductReviewTab);
