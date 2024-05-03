import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Stack, Container } from '../components/mui-components/MuiComponents';

const HeaderContainer = dynamic(() => import('../containers/header-container/HeaderContainer'), { ssr: false });
const NavbarContainer = dynamic(() => import('../containers/navbar-container/NavbarContainer'), { ssr: false });
const FooterContainer = dynamic(() => import('../containers/footer-container/FooterContainer'), { ssr: false });

function Layout({ children }) {
  return (
    <Container maxWidth="xl" disableGutters sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', rowGap: '2rem' }}>
      <Stack position="sticky" top={0} width="100%" bgcolor="background.paper" zIndex={999}>
        <header>
          <HeaderContainer />
        </header>
        <nav>
          <NavbarContainer />
        </nav>
      </Stack>
      <Box flexGrow={1}>
        <main>{children}</main>
      </Box>
      <Box mt="auto">
        <footer>
          <FooterContainer />
        </footer>
      </Box>
    </Container>
  );
}

export default Layout;
