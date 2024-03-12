import React, { useCallback, useMemo, useState } from 'react';

import { Box, FormHelperText, MuiRating, InputLabel, Stack } from '../mui-components/MuiComponents';
import { StarIcon } from '../mui-icons/muiIcons';
import Typography from '../typography/Typography';

export default function InputRating({ input, id, label, translate, ready, meta }) {
  const [hover, setHover] = useState(-1);

  const labels = useMemo(
    () => ({
      0.5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.useless') : 'Useless'}`,
      1: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.useless') : 'Useless'}+`,
      1.5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.poor') : 'Poor'}`,
      2: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.poor') : 'Poor'}+`,
      2.5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.ok') : 'Ok'}`,
      3: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.ok') : 'Ok'}+`,
      3.5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.good') : 'Good'}`,
      4: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.good') : 'Good'}+`,
      4.5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.excellent') : 'Excellent'}`,
      5: `${ready ? translate('productDetails.reviewTab.reviewRatingLabels.excellent') : 'Excellent'}+`,
    }),
    [ready, translate]
  );

  const getLabelText = useCallback(
    (value) => {
      return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    },
    [labels]
  );

  return (
    <Stack>
      <Box
        sx={{
          alignItems: 'center',
          columnGap: 2,
          display: 'flex',
          width: 200,
        }}>
        <Stack spacing={0.5}>
          <InputLabel htmlFor={id} error={meta.error && meta.touched}>
            <Typography text={label} variant="caption" color={meta.error && meta.touched ? 'error' : 'primary'} style={{ pl: 1.5 }} />
          </InputLabel>
          <MuiRating
            name="hover-feedback"
            id={id}
            value={Number(input.value)}
            size="large"
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              input.onChange(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            icon={<StarIcon style={{ color: '#ffa733' }} fontSize="large" />}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="large" />}
          />
        </Stack>
        {Number(input.value) !== null && <Box sx={{ mt: 2 }}>{labels[hover !== -1 ? hover : Number(input.value)]}</Box>}
      </Box>
      <FormHelperText sx={() => ({ color: 'error.main', pl: 1.5 })}>{meta.touched && meta.error}</FormHelperText>
    </Stack>
  );
}
