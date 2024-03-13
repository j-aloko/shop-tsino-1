import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { wrapper } from '../../services/redux/store/store';
import { getShopPolicies } from '../../services/shopify/api-queries/shop';

const MetaTags = dynamic(() => import('../../components/meta-tags/MetaTags'), { ssr: true });
const PolicyContentDisplay = dynamic(() => import('../../components/policy-content-display/PolicyContentDisplay'), { ssr: true });

function ShippingPolicy({ content, selectedLanguage, title }) {
  const metaProps = useMemo(
    () => ({
      canonical: PATH.shippingPolicy,
      description: content,
      locale: selectedLanguage,
      title: `${title} | ${process.env.NEXT_PUBLIC_NAME_STORE_NAME}`,
    }),
    [content, selectedLanguage, title]
  );

  return (
    <>
      <MetaTags {...metaProps} />
      <PolicyContentDisplay content={content} title={title} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const selectedLanguage = store.getState().shopInfo.selectedLanguage.isoCode;
  const urlPath = PATH.shippingPolicy.slice(1);

  const res = await getShopPolicies({ handle: urlPath, language: selectedLanguage });

  if (!res) {
    return { notFound: true };
  }

  return {
    props: { content: res?.body || '', selectedLanguage, title: res?.title || '' },
  };
});

export default ShippingPolicy;
