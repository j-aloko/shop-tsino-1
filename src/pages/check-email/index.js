'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const CheckEmailContainer = dynamic(() => import('../../containers/check-email-container/CheckEmailContainer'), { ssr: false });

function CheckEmail() {
  return <CheckEmailContainer />;
}

export async function getServerSideProps(context) {
  if (await isLoggedIn(context.req)) {
    return {
      redirect: {
        destination: PATH.home,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default CheckEmail;
