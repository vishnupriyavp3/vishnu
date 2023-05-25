import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AddData, SetEditData } from '../../service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetInvoiceEditDetail, GetClientData, GetInvoices } from '../../action';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
const schema = Yup.object().shape({
  InvoiceDate: Yup.string().required('Date is required'),
  DueDate: Yup.string().required('Date is required'),
  ChooseClient: Yup.string().required('Client is required'),
  Amount: Yup.number().required('Amount is required'),
});
const Invoice = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { ClientData } = useSelector((state) => state.Reducer);

  const Edit = pathname.includes('/InvoiceEdit/');
  const [ClientVal, setClientval] = useState(id ? ClientData?.Name : '');

  const { InvoiceEditDetail } = useSelector((state) => state.Reducer);

  const [percentage, setpercentage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetClientData(id));
    if (id) {
      dispatch(GetInvoiceEditDetail(id));
    } else {
      dispatch(GetClientData(id));
    }
  }, [id]);
  console.log('percentage', percentage);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Formik
        initialValues={{
          InvoiceDate: Edit ? InvoiceEditDetail?.InvoiceDate : '',
          DueDate: Edit ? InvoiceEditDetail?.DueDate : '',
          ChooseClient: Edit ? InvoiceEditDetail?.ChooseClient : '',
          Amount: Edit ? InvoiceEditDetail?.Amount : '',
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          if (id) {
            values = {
              ...values,
              Amount: InvoiceEditDetail?.percentage.GST
                ? (JSON.parse(values.Amount) / 100) *
                    JSON.parse(InvoiceEditDetail?.percentage.GST) +
                  JSON.parse(values.Amount)
                : values.Amount,
              percentage: percentage
                ? percentage
                : InvoiceEditDetail?.percentage,
              Percentage: percentage
                ? percentage
                : InvoiceEditDetail?.percentage,
            };
            SetEditData(`Invoice/${id}`, values);
            resetForm();
            navigate('/Report');
          } else {
            values = {
              ...values,
              percentage,
              Amount: percentage.GST
                ? (JSON.parse(values.Amount) / 100) *
                    JSON.parse(percentage.GST) +
                  JSON.parse(values.Amount)
                : values.Amount,
            };
            AddData('Invoice', values);
            dispatch(GetInvoices());
            resetForm();
            navigate('/Report');
          }
        }}
        enableReinitialize
      >
        {({ touched, errors, isSubmitting, values }) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div>
              <Form style={{ minWidth: '350px' }}>
                <h2 style={{ textAlign: 'center' }}>InvoiceManagement</h2>
                <label htmlFor="InvoiceDate" className="mt-3">
                  Invoice Date
                </label>
                <br />
                <Field
                  type="date"
                  name="InvoiceDate"
                  className={`mt-2 form-control
                      ${
                        touched.InvoiceDate && errors.InvoiceDate
                          ? 'is-invalid'
                          : ''
                      }`}
                ></Field>
                <ErrorMessage
                  component="div"
                  name="InvoiceDate"
                  className="invalid-feedback"
                />
                <label htmlFor="DueDate" className="mt-3">
                  Due Date
                </label>
                <br />
                <Field
                  type="date"
                  name="DueDate"
                  className={`mt-2 form-control
                      ${touched.DueDate && errors.DueDate ? 'is-invalid' : ''}`}
                ></Field>
                <ErrorMessage
                  component="div"
                  name="DueDate"
                  className="invalid-feedback"
                />
                <label htmlFor="ChooseClient" className="mt-3">
                  Choose Client
                </label>
                <Field
                  onClick={(e) => setClientval(e.target.value)}
                  name="ChooseClient"
                  as="select"
                  className={`mt-2 form-control
                      ${
                        touched.ChooseClient && errors.ChooseClient
                          ? 'is-invalid'
                          : ''
                      }`}
                >
                  <option value={''}>Choose Client</option>
                  {ClientData?.map((e, index) => (
                    <option key={index} value={e.Name}>
                      {e.Name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  component="div"
                  name="ChooseClient"
                  className="invalid-feedback"
                />
                <br />
                {console.log('ClientData', ClientData)}
                {ClientData?.map((e, index) =>
                  e.Name === ClientVal && ClientVal !== '' ? (
                    <div key={index}>
                      {setpercentage(e)}

                      <div
                        style={{ width: '100%', marginBottom: '3%' }}
                        className="card"
                      >
                        <div>
                          <img
                            style={{ width: '100%', height: '40vh' }}
                            src={e.Image}
                            className="card-img-top"
                            alt="..."
                          />
                        </div>

                        <div className="card-body">
                          <h5 className="card-title">{e.Name}</h5>
                          <p className="card-text">{e.Address}</p>
                          <p className="card-text">{e.Phone}</p>
                          <p className="card-text">GST: {e.GST}%</p>
                          <p className="card-text">
                            <small className="text-muted">{e.Email}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
                {id && percentage === '' ? (
                  <div>
                    <div
                      style={{ width: '100%', marginBottom: '3%' }}
                      className="card"
                    >
                      <div>
                        <img
                          style={{ width: '100%', height: '40vh' }}
                          src={InvoiceEditDetail?.percentage.Image}
                          className="card-img-top"
                          alt="..."
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {InvoiceEditDetail?.percentage.Name}
                        </h5>
                        <p className="card-text">
                          {InvoiceEditDetail?.percentage.Address}
                        </p>
                        <p className="card-text">
                          {InvoiceEditDetail?.percentage.Phone}
                        </p>
                        <p className="card-text">
                          GST: {InvoiceEditDetail?.percentage.GST}%
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {InvoiceEditDetail?.percentage.Email}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                <label htmlFor="Amount" className="mt-3">
                  Amount
                </label>
                <br />
                <Field
                  type="text"
                  name="Amount"
                  className={`mt-2 form-control
                      ${touched.Amount && errors.Amount ? 'is-invalid' : ''}`}
                ></Field>
                <ErrorMessage
                  component="div"
                  name="Amount"
                  className="invalid-feedback"
                />
                <button
                  type="submit"
                  style={{ marginTop: '5px', width: '100%' }}
                  className="btn btn-dark"
                >
                  Submit
                </button>
                <button
                  onClick={() => navigate('/report')}
                  style={{ marginTop: '5px', width: '100%' }}
                  className="btn btn-dark"
                >
                  Cancel
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Invoice;
