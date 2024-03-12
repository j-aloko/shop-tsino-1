import React from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { isLoggedIn } from '../../utils/auth';

const CustomerOrderDetailContainer = dynamic(() => import('../../containers/customer-order-detail-container/CustomerOrderDetailContainer'), { ssr: false });

function OrderDetails({ orderId }) {
  return <CustomerOrderDetailContainer orderId={+orderId} />;
}

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

  const { orderId } = context.params;

  if (!orderId) {
    const { notFound } = await import('next/navigation');
    return notFound();
  }

  return {
    props: { orderId },
  };
}

export default OrderDetails;
