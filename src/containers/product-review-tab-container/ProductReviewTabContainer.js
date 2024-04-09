'use client';

import React, { useCallback, useMemo, useState } from 'react';

import InputRating from '../../components/input-rating/InputRating';
import Modal from '../../components/modal/Modal';
import { Box } from '../../components/mui-components/MuiComponents';
import ProductReviewTab from '../../components/product-review-tab/ProductReviewTab';
import QuillTextEditor from '../../components/quill-editor/QuillEditor';
import TextField from '../../components/textfield/TextField';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import { MODAL_TYPE } from '../../constant/modal';
import { fetchData } from '../../services/api/apiHandler';
import { selectUser } from '../../services/redux/slices/auth-slice/selectors';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectReviewModal } from '../../services/redux/slices/modal-slice/selectors';
import { useSelector, useDispatch } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const reviewModalStyle = {
  bgcolor: 'background.paper',
  borderRadius: { md: 1, xs: 0 },
  boxShadow: 24,
  height: { xs: '100vh' },
  left: '50%',
  maxWidth: { md: 'sm', xs: 'xs' },
  position: 'absolute',
  top: { md: '50%', xs: '0%' },
  transform: { md: 'translate(-50%, -50%)', xs: 'translate(-50%, -0%)' },
  width: '100%',
};

const reviewValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
  name: Yup.string().required('Required Field'),
  rating: Yup.string().required('Required Field'),
  review: Yup.string().required('Required Field'),
  reviewTitle: Yup.string().required('Required Field'),
});

const validateReview = formValidation(reviewValidationSchema);

function ProductReviewTabContainer({ productId, productReviews, translate, ready }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const productReviewModal = useSelector(selectReviewModal);

  const [reviews, setReviews] = useState(productReviews ? JSON.parse(productReviews) : []);
  const [initialReviewFormValues, setInitialReviewFormValues] = useState({});
  const [isReviewUpdate, setIsReviewUpdate] = useState(false);

  const handleToggleReviewFormModal = useCallback(
    (type, initialValues) => {
      if (type === 'update') {
        setIsReviewUpdate(true);
        setInitialReviewFormValues(initialValues);
      } else {
        setIsReviewUpdate(false);
        setInitialReviewFormValues({ email: user?.email || '', name: user?.displayName || '' });
      }
      dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.review }));
    },
    [dispatch, user]
  );

  const reviewFormFields = useMemo(
    () => [
      {
        component: TextField,
        disabled: isReviewUpdate || !!user?.displayName,
        id: 'name',
        label: `${ready ? translate('forms.labels.fullName') : 'Full name'}`,
        placeholder: `${ready ? translate('forms.placeholders.fullName') : 'May I know your full name?'} *`,
      },
      {
        component: TextField,
        disabled: isReviewUpdate || !!user?.email,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
      {
        component: TextField,
        id: 'reviewTitle',
        label: `${ready ? translate('forms.labels.reviewTitle') : 'Review Title'}`,
        placeholder: `${ready ? translate('forms.placeholders.reviewTitle') : 'Summarize your review in a catchy title'} *`,
      },
      {
        component: InputRating,
        id: 'rating',
        label: `${ready ? translate('forms.labels.rateThisProduct') : 'Rate this product'}`,
        placeholder: `${ready ? translate('forms.placeholders.rateThisProduct') : 'How would you rate this product?'} *`,
        ready,
        translate,
      },
      {
        component: QuillTextEditor,
        id: 'review',
        label: `${ready ? translate('forms.labels.reviewMessage') : 'Review Message'}`,
        placeholder: `${ready ? translate('forms.placeholders.reviewMessage') : 'Share your thoughts about this product'} *`,
      },
    ],
    [isReviewUpdate, ready, translate, user?.displayName, user?.email]
  );

  const handleReviewFormSubmit = useCallback(
    async (values) => {
      const { toast } = await import('react-toastify');
      try {
        const res = await fetchData('/api/v1/products/product/reviews', {
          productId,
          review: { ...values, isUpdated: isReviewUpdate, publishedAt: new Date().toISOString() },
        });

        if (res.product) {
          const { metafields } = res.product;
          const stringifiedReviews = metafields?.find(({ key }) => key === 'reviews')?.value;
          const newReviews = JSON.parse(stringifiedReviews);
          setReviews(newReviews);
          dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.review }));
        }
      } catch (error) {
        toast.error(error?.message || 'Failed to add review. Something went wrong');
      }
    },
    [dispatch, isReviewUpdate, productId]
  );

  const reviewFormProps = {
    buttonName: `${ready ? translate('buttons.submitReview') : 'Submit Review'}`,
    formFields: reviewFormFields,
    initialValues: initialReviewFormValues,
    onSubmitForm: handleReviewFormSubmit,
    submitPending: false,
    validate: validateReview,
  };

  return (
    <Box>
      <ProductReviewTab
        onOpenReviewFormModal={handleToggleReviewFormModal}
        productReviews={reviews}
        authenticatedUserEmail={user?.email || ''}
        translate={translate}
        ready={ready}
      />
      <Modal open={productReviewModal} onCloseModal={handleToggleReviewFormModal} modalStyle={reviewModalStyle}>
        <Box p={2}>
          <UserFeedbackForm {...reviewFormProps} />
        </Box>
      </Modal>
    </Box>
  );
}

export default ProductReviewTabContainer;
