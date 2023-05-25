import { EditData, Getdata, SetEditData } from '../service';
import {
  validatePassword,
  getPasswordHashResponse,
} from '../utils/PasswordHash';
export const GetAdminDetails = (Userdata) => async (dispatch) => {
  const { data } = await Getdata('Admin');

  if (
    validatePassword(data[0].Password, Userdata.Password) &&
    Userdata.email === data[0].Email
  ) {
    dispatch({
      type: 'LoginSuccess',
    });
  } else {
    dispatch({
      type: 'LoginFailed',
    });
  }
};
export const GetClientData = () => async (dispatch) => {
  const { data } = await Getdata('Client');
  dispatch({
    type: 'ClientData',
    payload: data,
  });
};
export const ClientEditData = (id) => async (dispatch) => {
  const { data } = await EditData(`/Client/${id}`);
  dispatch({
    type: 'clientEditData',
    payload: data,
  });
};
export const GetInvoiceEditDetail = (id) => async (dispatch) => {
  const { data } = await EditData(`Invoice/${id}`);
  console.log(data);
  dispatch({
    type: 'InvoiceEditDetail',
    payload: data,
  });
};
export const GetInvoices = () => async (dispatch) => {
  const { data } = await Getdata('Invoice');
  dispatch({
    type: 'INVOICE',
    payload: data,
  });
};
export const changePassword = (values) => async (dispatch) => {
  const { data } = await Getdata('Admin');
  if (validatePassword(data[0].Password, values.CurrentPassword)) {
    let Password = getPasswordHashResponse(values.Password);
    let value = {
      Email: data[0].Email,
      Password,
    };
    SetEditData(`Admin/${1}`, value);
    dispatch({
      type: 'Validation_Success',
    });
  } else {
    dispatch({
      type: 'Validation_Failed',
    });
  }
};
