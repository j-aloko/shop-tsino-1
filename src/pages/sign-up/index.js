import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const SignUpContainer = dynamic(() => import('../../containers/sign-up-container/SignUpContainer'), { ssr: true });

function SignUp() {
  return <SignUpContainer />;
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

export default SignUp;
