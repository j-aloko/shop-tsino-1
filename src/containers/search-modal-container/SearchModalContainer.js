'use client';

import React, { useCallback, useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import Modal from '../../components/modal/Modal';
import { Box, CircularProgress, Stack } from '../../components/mui-components/MuiComponents';
import SearchBar from '../../components/search-bar/SearchBar';
import SearchResultCard from '../../components/search-result-card/SearchResultCard';
import Typography from '../../components/typography/Typography';
import { MODAL_TYPE } from '../../constant/modal';
import { fetchData } from '../../services/api/apiHandler';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectSearchQueryModal } from '../../services/redux/slices/modal-slice/selectors';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

const searchModalStyle = {
  bgcolor: 'background.paper',
  borderRadius: { md: 1, xs: 0 },
  boxShadow: 24,
  height: 'auto',
  left: { lg: 370, md: '33%', sm: '45%', xs: '50%' },
  maxWidth: { sm: 'sm', xs: 'xs' },
  overflowY: 'hidden',
  position: 'absolute',
  top: { sm: 75, xs: 115 },
  transform: { md: 'translateX(-50%)', xs: 'translateX(-50%)' },
  width: '100%',
};

function SearchModalContainer() {
  const dispatch = useDispatch();
  const searchQueryModal = useSelector(selectSearchQueryModal);
  const selectedLanguage = useSelector(selectSelectedLanguage);

  const [querying, setQuerying] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleToggleSearchModalQuery = useCallback(() => {
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.searchQuery }));
    setSearchResults(null);
  }, [dispatch]);

  // Debounced function to query products
  const queryProducts = useDebouncedCallback(async ({ filter, first }) => {
    setQuerying(true);
    const { toast } = await import('react-toastify');
    try {
      const data = await fetchData('/api/v1/products', { filter, first, language: selectedLanguage });
      setSearchResults(data);
    } catch (error) {
      toast.error(error?.message || 'Query failed! Something went wrong');
    } finally {
      setQuerying(false);
    }
  }, 500);

  const handleSearchQuery = useCallback(
    ({ target: { value } }) => {
      if (value) {
        queryProducts({ filter: { title: value }, first: 250 });
      } else {
        setSearchResults([]);
      }
    },
    [queryProducts]
  );

  let content;
  if (searchResults?.length > 0) {
    content = <>{React.Children.toArray(searchResults?.map((searchResult) => <SearchResultCard {...searchResult} onClickSearchResultCard={handleToggleSearchModalQuery} />))}</>;
  } else if (querying) {
    content = <CircularProgress color="secondary" size={25} />;
  } else if (searchResults?.length === 0) {
    content = <Typography text="No results found" textAlign="left" variant="subtitle1" color="text.secondary" />;
  }

  return (
    <Modal open={searchQueryModal} onCloseModal={handleToggleSearchModalQuery} modalStyle={searchModalStyle} backdropFilter={false} closeOnClickAway>
      <Box maxWidth="sm" width="100%" p={2}>
        <Stack spacing={4}>
          <SearchBar onSearchQuery={handleSearchQuery} />
          {content}
        </Stack>
      </Box>
    </Modal>
  );
}

export default SearchModalContainer;
