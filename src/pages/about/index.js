import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { wrapper } from '../../services/redux/store/store';
import { getPage } from '../../services/shopify/api-queries/pages';

const MetaTags = dynamic(() => import('../../components/meta-tags/MetaTags'), { ssr: true });
const PolicyContentDisplay = dynamic(() => import('../../components/policy-content-display/PolicyContentDisplay'), { ssr: true });

function About({ content, selectedLanguage, title }) {
  const metaProps = useMemo(
    () => ({
      canonical: PATH.about,
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
  const urlPath = PATH.about.slice(1);

  const res = await getPage({ handle: urlPath, language: selectedLanguage });

  if (!res) {
    const { notFound } = await import('next/navigation');
    return notFound();
  }

  return {
    props: { content: res?.body || '', selectedLanguage, title: res?.title || '' },
  };
});

export default About;
