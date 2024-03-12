import React from 'react';

import DisplayRating from '../display-rating/DisplayRating';
import { Box, IconButton, Stack } from '../mui-components/MuiComponents';
import { DriveFileRenameOutlineIcon } from '../mui-icons/muiIcons';
import Typography from '../typography/Typography';

function Review({ name, email, authenticatedUserEmail, reviewTitle, rating, review, publishedAt, isUpdated, onUpdateReview }) {
  return (
    <Stack spacing={0.5}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <DisplayRating value={rating} precision={0.5} size="medium" />
        {email === authenticatedUserEmail ? (
          <IconButton
            aria-label="driveFileRename"
            onClick={() => onUpdateReview('update', { email, name, rating, review, reviewTitle })}
            sx={{
              borderRadius: 2,
              boxShadow: 1,
              color: 'secondary.main',
              height: 40,
              width: 40,
            }}>
            <DriveFileRenameOutlineIcon />
          </IconButton>
        ) : null}
      </Box>
      <Typography text={reviewTitle} variant="h6" color="text.secondary" />
      <Typography text={`${isUpdated ? 'Updated' : 'Reviewed'} by ${name} on ${new Date(publishedAt).toDateString()}`} variant="body2" color="text.secondary" fontWeight={600} />
      <Typography text={review} variant="body1" color="text.secondary" />
    </Stack>
  );
}

export default Review;
