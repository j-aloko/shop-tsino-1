import React, { useCallback, useMemo } from 'react';

import { Box, Button, ButtonGroup, CircularProgress } from '../mui-components/MuiComponents';
import { AddIcon, RemoveIcon } from '../mui-icons/muiIcons';
import Tooltip from '../tooltip/Tooltip';
import Typography from '../typography/Typography';

const iconStyle = { opacity: 0.5 };

const buttonStyle = (theme) => ({
  '&:hover': {
    borderColor: theme.palette.grey[300],
    borderRightColor: theme.palette.grey[300],
  },
  borderColor: theme.palette.grey[300],
  width: 40,
});

function Counter({ quantity, quantityAvailable = null, id, pending = false, onQuantityChange }) {
  const isAddDisabled = useMemo(() => quantity === quantityAvailable || quantityAvailable === 0, [quantity, quantityAvailable]);
  const isSubtractDisabled = useMemo(() => quantity === 1 || quantityAvailable === 0, [quantity, quantityAvailable]);

  let addTooltipTitle = '';
  if (isAddDisabled) {
    addTooltipTitle = quantityAvailable === 0 ? 'No quantity in stock' : 'Maximum quantity reached';
  }

  let subtractTooltipTitle = '';
  if (isSubtractDisabled) {
    subtractTooltipTitle = quantityAvailable === 0 ? 'No quantity in stock' : 'Minimum quantity reached';
  }

  const handleQuantityChange = useCallback(
    (operation) => {
      if ((operation === 'add' && !isAddDisabled) || (operation === 'subtract' && !isSubtractDisabled)) {
        onQuantityChange(id || operation, operation);
      }
    },
    [id, isAddDisabled, isSubtractDisabled, onQuantityChange]
  );

  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Tooltip title={subtractTooltipTitle} placement="top-start">
        <Button sx={buttonStyle} onClick={() => handleQuantityChange('subtract')}>
          <Box>
            <RemoveIcon color="secondary" sx={iconStyle} />
          </Box>
        </Button>
      </Tooltip>
      <Button sx={buttonStyle}>
        {pending ? (
          <Box>
            <CircularProgress color="secondary" size={12} />
          </Box>
        ) : (
          <Box>
            <Typography text={quantity} variant="body1" color="text.secondary" fontWeight={600} />
          </Box>
        )}
      </Button>
      <Tooltip title={addTooltipTitle} placement="top-start">
        <Button sx={buttonStyle} onClick={() => handleQuantityChange('add')}>
          <Box>
            <AddIcon color="secondary" sx={iconStyle} />
          </Box>
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default Counter;
