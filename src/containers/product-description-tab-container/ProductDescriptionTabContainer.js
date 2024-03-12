'use client';

import React from 'react';

import ProductDescriptionTab from '../../components/product-description-tab/ProductDescriptionTab';

function ProductDescriptionTabContainer({ description }) {
  return <ProductDescriptionTab productDescription={description} />;
}

export default ProductDescriptionTabContainer;
