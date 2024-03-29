import React, { useState } from 'react';

import { alpha } from '../../mui-styles/muiStyles';
import { Grid, ToggleButton } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function ToggleButtonGroup({ optionName, values, selectedValue, onValueChange, product, selectedOptions }) {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <Grid container spacing={2}>
      {React.Children.toArray(
        values?.map((value) => {
          product.variants?.some((variant) =>
            variant.selectedOptions.every(
              (opt) =>
                (opt.name !== optionName && opt.value === selectedOptions.find((o) => o.name === opt.name)?.value) ||
                (opt.name === optionName && opt.value === (value === hoveredValue ? value : selectedValue))
            )
          );

          return (
            <Grid item xs={6} key={value}>
              <ToggleButton
                value={value}
                selected={value === selectedValue}
                onChange={() => onValueChange(value)}
                onMouseEnter={() => setHoveredValue(value)}
                onMouseLeave={() => setHoveredValue(null)}
                fullWidth
                sx={(theme) => ({
                  '&.Mui-selected': {
                    backgroundColor: `${alpha(theme.palette.secondary.dark, 0.15)} !important`,
                  },
                  textTransform: 'capitalize',
                })}>
                <Typography text={value} variant="body2" color="text.secondary" fontWeight={value === selectedValue ? 600 : null} />
              </ToggleButton>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}

export default ToggleButtonGroup;
