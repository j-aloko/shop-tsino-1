import { configureStore } from '@reduxjs/toolkit';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch, useStore as useReduxStore } from 'react-redux';

import { reducer } from '../root-reducer/rootReducer';
import { shopInfoSlice } from '../slices/shop-info-slice/shopInfoSlice';

const makeStore = wrapMakeStore(() =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            {
              deserializationFunction: String,
              serializationFunction: String,
              subtree: `${shopInfoSlice.name}.selectedLanguage.isoCode`,
            },
          ],
        })
      ),
    reducer,
  })
);

export const wrapper = createWrapper(makeStore);

export const useDispatch = useReduxDispatch;
export const useSelector = useReduxSelector;
export const useStore = useReduxStore;
