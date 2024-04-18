'use client';

import React, { forwardRef } from 'react';

import dynamic from 'next/dynamic';

import { styled } from '../../mui-styles/muiStyles';
import { Box, CircularProgress, MuiTextField } from '../mui-components/MuiComponents';

const QuillEditor = dynamic(import('react-quill'), {
  loading: () => <CircularProgress color="secondary" />,
  ssr: false,
});

const StyledTextField = styled(MuiTextField)(({ theme, error }) => ({
  '& .MuiInputLabel-root': {
    color: `${theme.palette.text.secondary} !important`,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: error ? theme.palette.error.main : theme.palette.grey[300],
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: error ? theme.palette.error.main : theme.palette.grey[300],
    },
    color: theme.palette.text.secondary,
  },
  '& .ql-container': {
    height: 200,
  },
  '& .ql-editor': {
    color: theme.palette.text.secondary,
    height: '100%',
    ...theme.typography.body1,
  },
}));

const modules = {
  clipboard: {
    matchVisual: false,
  },
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'];

const QuillInputComponent = forwardRef(({ value, onChange, onBlur, placeholder }, ref) => (
  <Box ref={ref}>
    <QuillEditor value={value || ''} onChange={onChange} onBlur={onBlur} placeholder={placeholder} modules={modules} formats={formats} theme="snow" />
  </Box>
));

QuillInputComponent.displayName = 'QuillInputComponent';

export default function QuillTextEditor({ input, label, placeholder, meta, ...rest }) {
  return (
    <StyledTextField
      variant="outlined"
      focused
      fullWidth
      label={label}
      error={meta.error && meta.touched}
      helperText={meta.touched && meta.error}
      color="secondary"
      {...input}
      {...rest}
      InputProps={{
        inputComponent: QuillInputComponent,
        inputProps: { ...input, placeholder },
      }}
    />
  );
}
