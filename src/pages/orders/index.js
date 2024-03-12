import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const CustomerOrdersContainer = dynamic(() => import('../../containers/customer-orders-container/CustomerOrdersContainer'), { ssr: false });

function Orders() {
  return <CustomerOrdersContainer />;
}

export default Orders;

export async function getServerSideProps(context) {
  const loggedIn = await isLoggedIn(context.req);
  if (!loggedIn) {
    return {
      redirect: {
        destination: `${PATH.login}?redirect=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
