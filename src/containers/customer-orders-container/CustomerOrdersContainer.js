'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';

import Datagrid from '../../components/datagrid/Datagrid';
import { Box, Stack } from '../../components/mui-components/MuiComponents';
import RouterButton from '../../components/router-button/RouterButton';
import Typography from '../../components/typography/Typography';
import PATH from '../../constant/paths';
import { selectUser } from '../../services/redux/slices/auth-slice/selectors';
import { useSelector } from '../../services/redux/store/store';

function NoRowsLabel({ translate, ready }) {
  return (
    <Stack spacing={2} p={1}>
      <Typography
        text={ready ? translate('orders.noOrdersAlert') : 'No orders found'}
        variant="h6"
        color="text.secondary"
        style={{ fontWeight: 600, opacity: 0.8, textAlign: 'center' }}
      />
      <Box display="flex" justifyContent="center">
        <RouterButton name={ready ? translate('buttons.shopNow') : 'Shop Now'} color="secondary" path={PATH.collections} />
      </Box>
    </Stack>
  );
}

const gridHeaderStyle = {
  fontWeight: 600,
  opacity: 0.8,
};

const gridRowStyle = {
  fontWeight: 400,
};

function CustomerOrdersContainer() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userOrders = user?.orders || [];

  const { ready, t: translate } = useTranslation('common');

  const columns = [
    {
      field: 'order',
      flex: 0.5,
      minWidth: 120,
      renderCell: ({ row: { name, cancelReason } }) => {
        return <Typography text={name} variant="body2" color="text.secondary" fontWeight={600} style={cancelReason ? { textDecoration: 'line-through' } : {}} />;
      },
      renderHeader: () => <Typography text={ready ? translate('orders.dataGrideHeaders.order') : 'Order'} variant="body2" color="text.primary" style={gridHeaderStyle} />,
    },
    {
      field: 'date',
      flex: 1,
      minWidth: 180,
      renderCell: ({ row: { processedAt, cancelReason } }) => {
        return (
          <Typography
            text={new Date(processedAt).toDateString()}
            variant="body2"
            color="text.secondary"
            style={cancelReason ? { ...gridRowStyle, textDecoration: 'line-through' } : gridRowStyle}
          />
        );
      },
      renderHeader: () => <Typography text={ready ? translate('orders.dataGrideHeaders.date') : 'Date'} variant="body2" color="text.primary" style={gridHeaderStyle} />,
    },

    {
      field: 'payment status',
      flex: 1,
      minWidth: 180,
      renderCell: ({ row: { financialStatus } }) => {
        return (
          <Typography
            text={financialStatus
              .toLowerCase()
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
            variant="body2"
            color="text.secondary"
            style={gridRowStyle}
          />
        );
      },
      renderHeader: () => (
        <Typography text={ready ? translate('orders.dataGrideHeaders.paymentStatus') : 'Payment status'} variant="body2" color="text.primary" style={gridHeaderStyle} />
      ),
    },
    {
      field: 'fulfillment status',
      flex: 1,
      minWidth: 180,
      renderCell: ({ row: { fulfillmentStatus } }) => {
        return <Typography text={fulfillmentStatus.charAt(0) + fulfillmentStatus.slice(1).toLowerCase()} variant="body2" color="text.secondary" style={gridRowStyle} />;
      },
      renderHeader: () => (
        <Typography text={ready ? translate('orders.dataGrideHeaders.fulfillmentStatus') : 'Fulfillment status'} variant="body2" color="text.primary" style={gridHeaderStyle} />
      ),
    },
    {
      field: 'total',
      flex: 0.5,
      minWidth: 120,
      renderCell: ({
        row: {
          currentTotalPrice: { amount, currencyCode },
          cancelReason,
        },
      }) => {
        return (
          <Typography text={`${currencyCode}${amount}`} variant="body2" color="text.secondary" fontWeight={600} style={cancelReason ? { textDecoration: 'line-through' } : {}} />
        );
      },
      renderHeader: () => <Typography text={ready ? translate('orders.dataGrideHeaders.total') : 'Total'} variant="body2" color="text.primary" style={gridHeaderStyle} />,
    },
  ];

  const handleRowClick = (param) => {
    const {
      row: { orderNumber },
    } = param;

    router.push(`${PATH.orders}/${orderNumber}`);
  };

  const props = {
    columns,
    gridDensity: 'compact',
    handleRowClick,
    noRowsLabel: <NoRowsLabel translate={translate} ready={ready} />,
    pending: false,
    rowHeight: 80,
    rows: userOrders,
    uniqueKey: 'orderNumber',
  };

  return (
    <Stack spacing={4} p={2}>
      <Typography text="Orders" variant="h4" color="text.primary" />
      <Datagrid {...props} />
    </Stack>
  );
}

export default CustomerOrdersContainer;
