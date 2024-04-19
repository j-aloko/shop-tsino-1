import React, { useState } from 'react';

import { alpha } from '../../mui-styles/muiStyles';
import { Box, DataGrid /* GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton */ } from '../mui-components/MuiComponents';

/* function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ height: 50, p: 2 }}>
      <Box width="100%" display="flex" alignItems="center" justifyContent="flex-end" flexWrap="wrap" columnGap={2} rowGap={1}>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
    </GridToolbarContainer>
  );
} */

function Datagrid({ rows, rowHeight, columns, pending, uniqueKey, gridDensity = 'standard', noRowsLabel = 'No rows', handleRowClick }) {
  const [pageSize, setPageSize] = useState(50);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        {...(rows || [])}
        rows={rows || []}
        columns={columns || []}
        headerHeight={31.09}
        rowHeight={rowHeight || 33.14}
        pageSize={pageSize}
        loading={!!pending}
        rowsPerPageOptions={[25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        localeText={{
          noRowsLabel,
        }}
        density={gridDensity}
        disableSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        /* slots={{
          toolbar: CustomToolbar,
        }} */
        getRowId={(r) => {
          return r[uniqueKey];
        }}
        sx={(theme) => ({
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: alpha(theme.palette.grey[500], 0.15),
          },
        })}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}

export default Datagrid;
