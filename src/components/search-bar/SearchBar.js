'use client';

import React from 'react';

import { alpha, styled } from '../../mui-styles/muiStyles';
import { InputBase } from '../mui-components/MuiComponents';
import { SearchIcon } from '../mui-icons/muiIcons';

const Search = styled('div')(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.light, 0.25),
  },
  backgroundColor: alpha(theme.palette.secondary.light, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  marginRight: theme.spacing(2),
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  position: 'absolute',
}));

const StyledInputBase = styled(({ clickable, ...other }) => <InputBase {...other} />)(({ theme, clickable }) => ({
  '& .MuiInputBase-input': {
    cursor: clickable ? 'pointer' : 'text',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  color: 'inherit',
}));

function SearchBar({ onSearchQuery, onSearchBarClick }) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearchQuery}
        onClick={onSearchBarClick}
        clickable={!!onSearchBarClick}
        readOnly={!!onSearchBarClick}
        autoFocus={!!onSearchQuery}
        fullWidth
      />
    </Search>
  );
}

export default SearchBar;
