import { aboutSummarySlice } from '../slices/about-summary-slice/aboutSummarySlice';
import { authSlice } from '../slices/auth-slice/authSlice';
import { cartSlice } from '../slices/cart-slice/cartSlice';
import { contactFormSlice } from '../slices/contact-form-slice/contactFormSlice';
import { discountsSlice } from '../slices/discounts-slice/discountsSlice';
import { drawerSlice } from '../slices/drawer-slice/drawerSlice';
import { emailSubscriptionSlice } from '../slices/email-subscription-slice/emailSubscriptionSlice';
import { modalSlice } from '../slices/modal-slice/modalSlice';
import { shopInfoSlice } from '../slices/shop-info-slice/shopInfoSlice';

export const reducer = {
  [aboutSummarySlice.name]: aboutSummarySlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [contactFormSlice.name]: contactFormSlice.reducer,
  [discountsSlice.name]: discountsSlice.reducer,
  [drawerSlice.name]: drawerSlice.reducer,
  [emailSubscriptionSlice.name]: emailSubscriptionSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [shopInfoSlice.name]: shopInfoSlice.reducer,
};
