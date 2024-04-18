import React from 'react';

import dynamic from 'next/dynamic';

import { getAverageRating } from '../../utils/getAverageRating';
import ActionButton from '../action-button/ActionButton';
import ActualPrice from '../actual-price/ActualPrice';
import Counter from '../counter/Counter';
import DisplayRating from '../display-rating/DisplayRating';
import Divider from '../divider/Divider';
import ImageMagnifier from '../image-magnifier/ImageMagnifier';
import LinearProgressBar from '../linear-progress-bar/LinearProgressBar';
import { Box, Grid, Stack } from '../mui-components/MuiComponents';
import PreviousPrice from '../previous-price/PreviousPrice';
import Typography from '../typography/Typography';

const ProductImageCarousel = dynamic(() => import('../product-image-carousel/ProductImageCarousel'), { ssr: false });
const ProductSpecification = dynamic(() => import('../product-specification/ProductSpecification'), { ssr: false });
const ToggleButtonGroup = dynamic(() => import('../toggle-button-group/ToggleButtonGroup'), { ssr: false });

function ProductDetail(props) {
  return (
    <Grid container p={2}>
      <Grid item md={5} sm={6} xs={12} p={2}>
        <ProductImageSection {...props} />
      </Grid>

      <Grid item md={4} sm={6} xs={12} p={2}>
        <ProductDetailsSection {...props} />
      </Grid>

      <Grid item md={3} sm={6} xs={12} p={2} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <ResponsiveSection {...props} />
      </Grid>
    </Grid>
  );
}

function ProductImageSection({
  product,
  selectedProductImage,
  productImages,
  productImageCarouselindex,
  handleSelectProductImageCarouselindex,
  handleProductImageChange,
  ready,
  translate,
}) {
  return (
    <Stack spacing={3} p={2}>
      <Box height={{ lg: '60vh', xs: '40vh' }}>
        <ImageMagnifier src={selectedProductImage} width="100%" height="inherit" objectFit="contain" alt={product.handle} />
      </Box>
      <Typography
        text={ready ? translate('productDetails.zoomHint') : 'Roll over image to zoom out'}
        variant="body2"
        color="text.secondary"
        style={{ fontWeight: 600, textAlign: 'center' }}
      />
      <ProductImageCarousel
        productImages={productImages}
        productImageCarouselindex={productImageCarouselindex}
        onSelectProductImageCarouselindex={handleSelectProductImageCarouselindex}
        onProductImageChange={handleProductImageChange}
      />
    </Stack>
  );
}

function ProductDetailsSection({
  addToCartPending,
  buyNowLoading,
  product,
  selectedVariant,
  handleProductQuantityChange,
  productCount,
  handleAddProductToCart,
  handleBuyProductNow,
  handleOptionChange,
  productSpecifications,
  ready,
  shopInfo,
  translate,
}) {
  return (
    <Stack spacing={1.5} p={2}>
      <Typography text={product.title} variant="h5" color="text.secondary" />
      <DisplayRating value={getAverageRating(product.metafields)} precision={0.5} size="medium" />
      <Box display={{ md: 'none', sm: 'flex', xs: 'flex' }} alignItems="center" columnGap={1}>
        {selectedVariant.compareAtPrice && (
          <PreviousPrice
            previousPrice={`${selectedVariant.compareAtPrice.currencyCode || shopInfo.currencyCode}${selectedVariant.compareAtPrice.amount}`}
            variant="h6"
            color="text.secondary"
          />
        )}
        <ActualPrice actualPrice={`${selectedVariant.price.currencyCode || shopInfo.currencyCode}${selectedVariant.price.amount}`} variant="h5" color="text.secondary" />
      </Box>
      <Divider orientation="horizontal" variant="fullWidth" />
      <Stack spacing={1} maxWidth={{ sm: 320, xs: '100%' }}>
        {React.Children.toArray(productSpecifications.map((p) => p.value && <ProductSpecification spec={p.spec} value={p.value} />))}
      </Stack>
      <Stack spacing={1.5} display={{ md: 'none', sm: 'block' }}>
        {selectedVariant.availableForSale ? (
          <Typography text={ready ? translate('productDetails.inStock') : 'In Stock'} variant="h6" color="success.dark" />
        ) : (
          <Typography text={ready ? translate('productDetails.outOfStock') : 'Out of Stock'} variant="h6" color="error.main" />
        )}
        <Stack spacing={1}>
          {selectedVariant.availableForSale ? (
            <Typography
              text={`${
                ready
                  ? translate('productDetails.stockAlert', { quantity: selectedVariant.quantityAvailable })
                  : `Only ${selectedVariant.quantityAvailable} units of this variant is left in stock`
              }`}
              variant="body1"
              color="text.secondary"
              fontWeight={600}
            />
          ) : (
            <Typography
              text={ready ? translate('productDetails.outOfStockAlert') : 'This variant is not available at the moment'}
              variant="body1"
              color="text.secondary"
              fontWeight={600}
            />
          )}
          <LinearProgressBar stockQuantityLeft={selectedVariant?.quantityAvailable || 0} />
        </Stack>
        <Stack spacing={0.5}>
          <Typography text={ready ? translate('productDetails.quantity') : 'Quantity'} variant="body1" color="text.secondary" fontWeight={600} />
          <Counter quantity={productCount} quantityAvailable={selectedVariant.quantityAvailable} onQuantityChange={handleProductQuantityChange} />
        </Stack>
      </Stack>
      <Divider orientation="horizontal" variant="fullWidth" />
      {React.Children.toArray(
        product.options?.map((option) => (
          <Stack spacing={2}>
            <Typography text={option.name} variant="body1" color="text.secondary" fontWeight={600} />
            <ToggleButtonGroup
              optionName={option.name}
              values={option.values}
              selectedValue={selectedVariant?.selectedOptions.find((opt) => opt.name === option.name)?.value}
              onValueChange={(value) => handleOptionChange(option.name, value)}
              product={product}
              selectedOptions={selectedVariant.selectedOptions}
            />
          </Stack>
        ))
      )}
      <Grid container rowSpacing={2} display={{ md: 'none', sm: 'flex' }}>
        <Grid item xs={12}>
          <ActionButton
            name={ready ? translate('buttons.addToCart') : 'Add to cart'}
            color="secondary"
            size="medium"
            disabled={buyNowLoading || !selectedVariant.availableForSale}
            fullwidth
            onButtonClick={handleAddProductToCart}
            pending={addToCartPending}
          />
        </Grid>
        <Grid item xs={12}>
          <ActionButton
            name={ready ? translate('buttons.buyItNow') : 'Buy it Now'}
            color="primary"
            size="medium"
            fullwidth
            disabled={addToCartPending || !selectedVariant.availableForSale}
            onButtonClick={handleBuyProductNow}
            pending={buyNowLoading}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

function ResponsiveSection({
  addToCartPending,
  buyNowLoading,
  selectedVariant,
  handleProductQuantityChange,
  productCount,
  handleAddProductToCart,
  handleBuyProductNow,
  ready,
  shopInfo,
  translate,
}) {
  return (
    <Stack spacing={2} boxShadow={0} borderRadius={2} p={2} maxWidth={{ sm: 320, xs: '100%' }}>
      <Box display="flex" alignItems="center" columnGap={1}>
        {selectedVariant.compareAtPrice && (
          <PreviousPrice
            previousPrice={`${selectedVariant.compareAtPrice.currencyCode || shopInfo.currencyCode}${selectedVariant.compareAtPrice.amount}`}
            variant="h6"
            color="text.secondary"
          />
        )}
        <ActualPrice actualPrice={`${selectedVariant.price.currencyCode || shopInfo.currencyCode}${selectedVariant.price.amount}`} variant="h5" color="text.secondary" />
      </Box>
      {selectedVariant.availableForSale ? (
        <Typography text={ready ? translate('productDetails.inStock') : 'In Stock'} variant="h6" color="success.dark" />
      ) : (
        <Typography text={ready ? translate('productDetails.outOfStock') : 'Out of Stock'} variant="h6" color="error.main" />
      )}
      <Stack spacing={1}>
        {selectedVariant.availableForSale ? (
          <Typography
            text={`${
              ready
                ? translate('productDetails.stockAlert', { quantity: selectedVariant.quantityAvailable })
                : `Only ${selectedVariant.quantityAvailable} units of this variant is left in stock`
            }`}
            variant="body1"
            color="text.secondary"
            fontWeight={600}
          />
        ) : (
          <Typography
            text={ready ? translate('productDetails.outOfStockAlert') : 'This variant is not available at the moment'}
            variant="body1"
            color="text.secondary"
            fontWeight={600}
          />
        )}
        <LinearProgressBar stockQuantityLeft={selectedVariant.quantityAvailable} />
      </Stack>
      <Stack spacing={0.5}>
        <Typography text={ready ? translate('productDetails.quantity') : 'Quantity'} variant="body1" color="text.secondary" fontWeight={600} />
        <Counter quantity={productCount} quantityAvailable={selectedVariant.quantityAvailable} onQuantityChange={handleProductQuantityChange} />
      </Stack>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <ActionButton
            name={ready ? translate('buttons.addToCart') : 'Add to cart'}
            color="secondary"
            size="medium"
            disabled={buyNowLoading || !selectedVariant.availableForSale}
            fullwidth
            onButtonClick={handleAddProductToCart}
            pending={addToCartPending}
          />
        </Grid>
        <Grid item xs={12}>
          <ActionButton
            name={ready ? translate('buttons.buyItNow') : 'Buy it Now'}
            color="primary"
            size="medium"
            fullwidth
            disabled={addToCartPending || !selectedVariant.availableForSale}
            onButtonClick={handleBuyProductNow}
            pending={buyNowLoading}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(ProductDetail);
