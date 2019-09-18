import ContactUsActionTypes from './contact-us.types';

export const contactUsStart = (email, subject, message) => ({
  type: ContactUsActionTypes.CONTACT_US_START,
  payload: { email, subject, message }
});

export const contactUsSuccess = () => ({
  type: ContactUsActionTypes.CONTACT_US_SUCCESS
});

export const contactUsFailure = errorMessage => ({
  type: ContactUsActionTypes.CONTACT_US_FAILURE,
  payload: errorMessage
});
