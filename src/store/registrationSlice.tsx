import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  countryReg: string;
  countryCodeReg: string;
  currentPage: string;
  nicknameReg: string;
  emailReg: string;
  passwordReg: string;
  validationReg: {
    length: boolean;
    capitalLetter: boolean;
    lowercaseLetter: boolean;
    number: boolean;
    symbol: boolean;
  };
  invitationCodeReg: string;

  agreementReg: boolean;
  successArr: any;
  errorsArr: any;

  formToken: string;

  isVerificationCodeValidReg: boolean | null;

  qrfModalIsOpen: boolean;

  isPageTransition: boolean;

  yourLang: string;

  sendPasswordModalIsOpen: boolean;
  sendPasswordPage: string;
  emailForPassword: string;
}

const initialState: RegistrationState = {
  countryReg: "Russia",
  countryCodeReg: "171",

  currentPage: "First",
  nicknameReg: "",
  emailReg: "",
  passwordReg: "",
  validationReg: {
    length: false,
    capitalLetter: false,
    lowercaseLetter: false,
    number: false,
    symbol: false,
  },
  invitationCodeReg: "",

  agreementReg: false,

  successArr: [],
  errorsArr: [],

  formToken: "",

  isVerificationCodeValidReg: null,

  qrfModalIsOpen: false,

  isPageTransition: false,

  yourLang: "en",

  sendPasswordModalIsOpen: false,
  sendPasswordPage: "First",
  emailForPassword: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setCountryReg(state, action: PayloadAction<string>) {
      state.countryReg = action.payload;
    },
    setCountryCodeReg(state, action: PayloadAction<string>) {
      state.countryCodeReg = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    setNicknameReg(state, action: PayloadAction<string>) {
      state.nicknameReg = action.payload;
    },
    setEmailReg(state, action: PayloadAction<string>) {
      state.emailReg = action.payload;
    },
    setPasswordReg(state, action: PayloadAction<string>) {
      state.passwordReg = action.payload;
    },
    setValidationReg(
      state,
      action: PayloadAction<{
        length: boolean;
        capitalLetter: boolean;
        lowercaseLetter: boolean;
        number: boolean;
        symbol: boolean;
      }>
    ) {
      state.validationReg = action.payload;
    },
    setInvitationCodeReg(state, action: PayloadAction<string>) {
      state.invitationCodeReg = action.payload;
    },

    setAgreementReg(state, action: PayloadAction<boolean>) {
      state.agreementReg = action.payload;
    },
    setSuccessArr(state, action: PayloadAction<any>) {
      state.successArr = action.payload;
    },
    setErrorsArr(state, action: PayloadAction<any>) {
      state.errorsArr = action.payload;
    },
    setFormToken(state, action: PayloadAction<string>) {
      state.formToken = action.payload;
    },
    setIsVerificationCodeValid(state, action: PayloadAction<boolean | null>) {
      state.isVerificationCodeValidReg = action.payload;
    },
    setQRFModalIsOpen(state, action: PayloadAction<boolean>) {
      state.qrfModalIsOpen = action.payload;
    },
    setIsPageTransition(state, action: PayloadAction<boolean>) {
      state.isPageTransition = action.payload;
    },
    setYourLang(state, action: PayloadAction<string>) {
      state.yourLang = action.payload;
      if (action.payload === "ru") {
        state.countryReg = "Россия";
      } else {
        state.countryReg = "Russia";
      }
    },
    setSendPasswordModalIsOpen(state, action: PayloadAction<boolean>) {
      state.sendPasswordModalIsOpen = action.payload;
    },
    setSendPasswordPage(state, action: PayloadAction<string>) {
      state.sendPasswordPage = action.payload;
    },
    setEmailForPassword(state, action: PayloadAction<string>) {
      state.emailForPassword = action.payload;
    },
  },
});

export const {
  setCountryReg,
  setCountryCodeReg,
  setCurrentPage,
  setNicknameReg,
  setEmailReg,
  setPasswordReg,
  setValidationReg,
  setInvitationCodeReg,
  setAgreementReg,
  setSuccessArr,
  setErrorsArr,
  setFormToken,
  setIsVerificationCodeValid,
  setQRFModalIsOpen,
  setIsPageTransition,
  setYourLang,
  setSendPasswordModalIsOpen,
  setSendPasswordPage,
  setEmailForPassword,
} = registrationSlice.actions;

export default registrationSlice.reducer;
