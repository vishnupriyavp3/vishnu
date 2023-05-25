import { combineReducers } from 'redux';

const InitialValue = {
  IsSignedIn: localStorage.getItem('Login'),
  ClientData: null,
  clientEditData: null,
  InvoiceEditDetail: null,
  invoices: null,
  SignInError: null,
  ChangePasswordError: null,
  SuccessMessage: null,
};

const Reducer = (state = InitialValue, action) => {
  switch (action.type) {
    case 'LoginSuccess': {
      localStorage.setItem('Login', true);
      return {
        ...state,
        SignInError: null,
        IsSignedIn: localStorage.getItem('Login'),
      };
    }
    case 'Logout': {
      localStorage.setItem('Login', false);
      return {
        ...state,
        SignInError: null,
        IsSignedIn: localStorage.getItem('Login'),
      };
    }
    case 'LoginFailed': {
      localStorage.setItem('Login', false);
      return {
        ...state,
        SignInError: 'Invalid Credentials',
        IsSignedIn: localStorage.getItem('Login'),
      };
    }
    case 'ClientData': {
      return {
        ...state,
        ClientData: action.payload,
      };
    }
    case 'clientEditData': {
      return {
        ...state,
        clientEditData: action.payload,
      };
    }
    case 'ResetEditData': {
      return {
        ...state,
        clientEditData: null,
      };
    }
    case 'InvoiceEditDetail': {
      return {
        ...state,
        InvoiceEditDetail: action.payload,
      };
    }
    case 'INVOICE': {
      return {
        ...state,
        invoices: action.payload,
      };
    }
    case 'Validation_Failed': {
      return {
        ...state,
        ChangePasswordError: 'Invalid Credentials',
        SuccessMessage: null,
      };
    }
    case 'Validation_Success': {
      return {
        ...state,
        ChangePasswordError: null,
        SuccessMessage: 'Success',
      };
    }
    default:
      return state;
  }
};
export default combineReducers({
  Reducer,
});
