import React from 'react';

import dynamic from 'next/dynamic';

const NotFoundErrorContainer = dynamic(() => import('../../containers/not-found-error-container/NotFoundErrorContainer'), { ssr: true });

function NotFoundPage() {
  return <NotFoundErrorContainer />;
}

export default NotFoundPage;
