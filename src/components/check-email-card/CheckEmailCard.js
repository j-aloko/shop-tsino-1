'use client';

import React from 'react';

import Link from 'next/link';

import PATH from '../../constant/paths';
import ActionButton from '../action-button/ActionButton';
import { Box, Card, CardContent, Grid, Stack } from '../mui-components/MuiComponents';
import { EmailRoundedIcon } from '../mui-icons/muiIcons';
import Typography from '../typography/Typography';

function CheckEmailCard({ title, message, onResendEmail, resendPending, decodedRedirect, translate, ready }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ maxWidth: 450, minWidth: 'xs', p: 2 }}>
        <Card variant="outlined" sx={{ alignItems: 'center', display: 'flex', minHeight: 350 }}>
          <CardContent>
            <Stack spacing={3}>
              <Box display="flex" justifyContent="center">
                <EmailRoundedIcon color="secondary" fontSize="large" sx={{ height: 60, width: 60 }} />
              </Box>
              <Stack spacing={1}>
                <Typography text={title} textAlign="center" variant="h5" color="text.primary" />
                <Typography text={message} textAlign="center" variant="body1" color="text.secondary" />
              </Stack>
              <Stack spacing={1}>
                <Typography
                  text={ready ? translate('authentication.supplementalLinks.noEmail') : "Didn't receive any email?"}
                  textAlign="center"
                  variant="body1"
                  color="text.secondary"
                />
                <ActionButton
                  name={ready ? translate('buttons.resendEmail') : 'Resend Email'}
                  color="secondary"
                  size="medium"
                  disabled={resendPending}
                  fullwidth
                  onButtonClick={onResendEmail}
                  pending={resendPending}
                />
              </Stack>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={decodedRedirect ? `${PATH.login}?redirect=${encodeURIComponent(decodedRedirect)}` : PATH.login}>
                    <Typography
                      text={ready ? translate('authentication.supplementalLinks.login') : 'Login'}
                      variant="body2"
                      color="secondary"
                      style={{ textDecoration: 'underline' }}
                    />
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CheckEmailCard;
