import React from 'react';

import { Box, Pagination } from '../mui-components/MuiComponents';

function Paginate({ count, page, onPaginate }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        variant="outlined"
        color="secondary"
        count={count}
        page={+page}
        onChange={(event, value) => onPaginate(event, value)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'primary.main',
          },
        }}
      />
    </Box>
  );
}

export default Paginate;
