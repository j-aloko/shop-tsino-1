export const selectUser = (state) => state.auth.user;

export const selectSignUpLoading = (state) => state.auth.signUpStatus.loading;
export const selectSignUpError = (state) => state.auth.signUpStatus.error;
export const selectResendEmailActivationLoading = (state) => state.auth.resendEmailActivationStatus.loading;
export const selectResendEmailActivationError = (state) => state.auth.resendEmailActivationStatus.error;
export const selectLoginLoading = (state) => state.auth.loginStatus.loading;
export const selectLoginError = (state) => state.auth.loginStatus.error;
export const selectLogoutLoading = (state) => state.auth.logoutStatus.loading;
export const selectLogoutError = (state) => state.auth.logoutStatus.error;
export const selectRequestPasswordResetLinkLoading = (state) => state.auth.requestPasswordResetLinkStatus.loading;
export const selectRequestPasswordResetLinkError = (state) => state.auth.requestPasswordResetLinkStatus.error;
export const selectPasswordResetLoading = (state) => state.auth.passwordResetStatus.loading;
export const selectPasswordResetError = (state) => state.auth.passwordResetStatus.error;
export const selectAccountActivationLoading = (state) => state.auth.activateAccountStatus.loading;
export const selectAccountActivationError = (state) => state.auth.activateAccountStatus.error;
