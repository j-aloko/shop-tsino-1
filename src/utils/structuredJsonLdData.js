const { NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_NAME_STORE_NAME, NEXT_PUBLIC_ALTERNATE_STORE_NAME, NEXT_PUBLIC_STORE_EMAIL } = process.env;

const websiteStructuredJsonLdData = () => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    alternateName: NEXT_PUBLIC_ALTERNATE_STORE_NAME,
    name: NEXT_PUBLIC_NAME_STORE_NAME,
    url: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  };

  return { __html: JSON.stringify(jsonLdData) };
};

const logoStructuredJsonLdData = () => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    contactPoint: {
      '@type': 'ContactPoint',
      email: NEXT_PUBLIC_STORE_EMAIL,
    },
    logo: `${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/favicon.ico`,
    name: NEXT_PUBLIC_NAME_STORE_NAME,
    url: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  };

  return { __html: JSON.stringify(jsonLdData) };
};

const productPageStructuredJsonLdData = (product) => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    image: product.featuredImage.url,
    name: product.title,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
    },
  };

  return { __html: JSON.stringify(jsonLdData) };
};

export { websiteStructuredJsonLdData, logoStructuredJsonLdData, productPageStructuredJsonLdData };
