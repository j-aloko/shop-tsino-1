import React from 'react';

import dynamic from 'next/dynamic';

const ServerErrorContainer = dynamic(() => import('../../containers/server-error-container/ServerErrorContainer'), { ssr: true });

function ServerError() {
  return <ServerErrorContainer />;
}

export default ServerError;
