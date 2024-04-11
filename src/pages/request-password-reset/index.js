import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const RequestPasswordResetContainer = dynamic(() => import('../../containers/request-password-reset-container/RequestPasswordResetContainer'), { ssr: true });

function RequestPasswordReset() {
  return <RequestPasswordResetContainer />;
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

export default RequestPasswordReset;
