'use client';

import { useEffect, useRef } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { getAboutSummary } from '../../services/redux/slices/about-summary-slice/aboutSummarySlice';
import { getCustomerInfo } from '../../services/redux/slices/auth-slice/authSlice';
import { retrieveCartItems } from '../../services/redux/slices/cart-slice/cartSlice';
import { getAutomaticDiscountBasic } from '../../services/redux/slices/discounts-slice/discountsSlice';
import { checkNewsletterModal } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { getAvailableLanguages, getShopInfo } from '../../services/redux/slices/shop-info-slice/shopInfoSlice';
import { useDispatch, useSelector } from '../../services/redux/store/store';

export default function DataRetriever() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { i18n } = useTranslation();

  const selectedLanguage = useSelector(selectSelectedLanguage);

  // Using useRef hook to create mutable variables that don’t trigger re-renders
  const dispatchRef = useRef();
  const routerRef = useRef();

  dispatchRef.current = dispatch;
  routerRef.current = router;

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage.toLowerCase());
    dispatchRef.current(checkNewsletterModal());
    dispatchRef.current(getCustomerInfo({ router: routerRef.current }));
    dispatchRef.current(getAvailableLanguages());
    dispatchRef.current(getAutomaticDiscountBasic());
    dispatchRef.current(retrieveCartItems({ action: 'get' }));
    dispatchRef.current(getShopInfo());
    dispatchRef.current(getAboutSummary());
  }, [i18n, selectedLanguage]);

  return null;
}
