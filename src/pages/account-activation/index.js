import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const AccountActivationContainer = dynamic(() => import('../../containers/account-activation-container/AccountActivationContainer'), { ssr: true });

function AccountActivation() {
  return <AccountActivationContainer />;
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

export default AccountActivation;
