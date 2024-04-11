import React from 'react';

import dynamic from 'next/dynamic';

const ContactContainer = dynamic(() => import('../../containers/contact-container/ContactContainer'), { ssr: true });

function Contact() {
  return <ContactContainer />;
}

export default Contact;
