import React from 'react';

import dynamic from 'next/dynamic';

const FullPageCartItemsContainer = dynamic(() => import('../../containers/full-page-cart-items-container/FullPageCartItemsContainer'), { ssr: false });

function Cart() {
  return <FullPageCartItemsContainer />;
}

export default Cart;
