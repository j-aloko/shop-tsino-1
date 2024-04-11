import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const ResetPasswordContainer = dynamic(() => import('../../containers/reset-password-container/ResetPasswordContainer'), { ssr: true });

function ResetPassword() {
  return <ResetPasswordContainer />;
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

export default ResetPassword;
