import React from 'react';

import Counter from '../counter/Counter';
import Image from '../image/Image';
import { CircularProgress, Grid, IconButton, Stack } from '../mui-components/MuiComponents';
import { RemoveShoppingCartIcon } from '../mui-icons/muiIcons';
import Tooltip from '../tooltip/Tooltip';
import Typography from '../typography/Typography';

function DrawerCartItem({
  cartItem: {
    id,
    cost: { amountPerQuantity },
    merchandise: {
      image: { url: selectedVariantImage },
      product: {
        title,
        featuredImage: { url: productFeaturedImage },
      },
      quantityAvailable,
      title: variantTitle,
    },
    quantity,
  },
  updateCartItemloading,
  removeCartItemloading,
  onProductQuantityChange,
  onRemoveCartItem,
}) {
  return (
    <Grid container p={1}>
      <Grid item xs={4}>
        <Image
          src={selectedVariantImage || productFeaturedImage}
          alt="cart item"
          objectFit="contain"
          height={100}
          sizes="(max-width: 600px) 37px,
                 (max-width: 900px) 74px,
                 111px"
        />
      </Grid>
      <Grid item xs={7}>
        <Stack spacing={0.5}>
          <Typography text={title} variant="subtitle1" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
          <Typography text={variantTitle} variant="body2" color="text.secondary" />
          <Typography text={`${quantity} x ${amountPerQuantity?.amount}`} variant="body2" color="text.secondary" />
          <Counter id={id} pending={updateCartItemloading[id]} quantity={quantity} quantityAvailable={quantityAvailable} onQuantityChange={onProductQuantityChange} />
        </Stack>
      </Grid>
      <Grid item xs={1}>
        {removeCartItemloading[id] ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          <Tooltip title="remove Item" placement="top-start">
            <IconButton aria-label="delete" onClick={() => onRemoveCartItem(id)}>
              <RemoveShoppingCartIcon />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

export default DrawerCartItem;
