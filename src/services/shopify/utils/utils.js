import { HIDDEN_PRODUCT_TAG } from '../constants/constants';

export const removeEdgesAndNodes = (array) => {
  return array?.edges?.map((edge) => ({ ...edge?.node, cursor: edge?.cursor || null }));
};

export const reshapeImages = (images, productTitle) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened?.map((image) => {
    const filename = image?.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image?.altText || `${productTitle} - ${filename}`,
    };
  });
};

export const reshapeCustomer = (customer) => {
  return {
    ...customer,
    orders: customer.orders?.edges?.map((edge) => {
      const node = edge?.node;
      if (node?.lineItems) {
        node.lineItems = removeEdgesAndNodes(node.lineItems);
      }
      return { ...node, cursor: edge?.cursor || null };
    }),
  };
};

export const reshapeCart = (cart) => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

export const reshapeCollection = (collection) => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`,
  };
};

export const reshapeCollections = (collections) => {
  return collections
    .filter((collection) => collection)
    .map((collection) => reshapeCollection(collection))
    .filter((reshapedCollection) => reshapedCollection);
};

export const reshapeProduct = (product, filterHiddenProducts = true) => {
  if (!product || (filterHiddenProducts && product?.tags?.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, collections, ...rest } = product;

  const reshapedProduct = { ...rest };

  if (collections) {
    reshapedProduct.collections = removeEdgesAndNodes(collections);
  }

  if (images) {
    reshapedProduct.images = reshapeImages(images, product.title);
  }

  if (variants) {
    reshapedProduct.variants = removeEdgesAndNodes(variants);
  }

  return reshapedProduct;
};

export const reshapeProducts = (products) => {
  return products
    .filter((product) => product)
    .map((product) => reshapeProduct(product))
    .filter((reshapedProduct) => reshapedProduct);
};

export const buildFilterQuery = (filter) => {
  let query = '';

  if (filter?.available_for_sale) {
    query += `available_for_sale:${filter.available_for_sale} `;
  }

  if (filter?.product_type) {
    query += `product_type:${filter.product_type} `;
  }

  if (filter?.price_min && filter?.price_max) {
    query += `variants.price:>=${filter.price_min} variants.price:<=${filter.price_max}`;
  }

  if (filter?.title) {
    query += `title:*${filter.title.toLowerCase()}* OR title:*${filter.title.toUpperCase()}* `;
  }

  return query.trim();
};

export const buildFilterObject = (filter) => {
  const filterObject = {};

  if (filter?.available_for_sale) {
    filterObject.available = Boolean(filter.available_for_sale);
  }

  if (filter?.product_type) {
    filterObject.productType = filter.product_type;
  }

  if (filter?.price_min && filter?.price_max) {
    filterObject.price = { max: +filter.price_max, min: +filter.price_min };
  }

  return filterObject;
};
