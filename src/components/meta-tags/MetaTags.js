/* eslint-disable react/no-danger */
import React from 'react';

import Head from 'next/head';

import { logoStructuredJsonLdData, productPageStructuredJsonLdData, websiteStructuredJsonLdData } from '../../utils/structuredJsonLdData';

function MetaTags({ title, description, canonical, locale, isHomePage = false, isProductPage = false, product = null }) {
  return (
    <Head>
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}${canonical}`} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_NAME_STORE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}${canonical}`} />
      <meta property="og:description" content={description} />
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
      {isProductPage ? (
        <>
          <meta property="og:type" content="product" />
          <meta property="og:image" content={product.featuredImage.url} />
          <meta property="og:image:alt" content={product.handle} />
          <meta property="og:image:width" content={product.featuredImage.width} />
          <meta property="og:image:height" content={product.featuredImage.height} />
          <script
            type="application/ld+json"
            id="product"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productPageStructuredJsonLdData(product)),
            }}
          />
        </>
      ) : null}
      {isHomePage ? (
        <>
          <script
            type="application/ld+json"
            id="home"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteStructuredJsonLdData()),
            }}
          />
          <script
            type="application/ld+json"
            id="logo"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(logoStructuredJsonLdData()),
            }}
          />
        </>
      ) : null}
    </Head>
  );
}

export default MetaTags;
