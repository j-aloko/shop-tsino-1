import React from 'react';

import Divider from '../divider/Divider';
import { Box, MuiModal, Fade, IconButton, Stack } from '../mui-components/MuiComponents';
import { CloseIcon } from '../mui-icons/muiIcons';
import ScrollableBox from '../scrollable-box/ScrollableBox';

function Modal({ children, open, onCloseModal, closeOnClickAway = false, backdropFilter = true, modalStyle }) {
  return (
    <MuiModal
      open={open}
      onClose={closeOnClickAway ? onCloseModal : null}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: backdropFilter ? 'blur(6px)' : null,
            backgroundColor: backdropFilter ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
          },
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <ScrollableBox sx={modalStyle}>
          <Stack spacing={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton aria-label="close" onClick={onCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider orientation="horizontal" variant="fullWidth" />
            {children}
          </Stack>
        </ScrollableBox>
      </Fade>
    </MuiModal>
  );
}

export default Modal;
