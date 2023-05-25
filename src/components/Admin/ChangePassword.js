import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../../action';
import { useDispatch, useSelector } from 'react-redux';
const ChangePassword = () => {
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    CurrentPassword: Yup.string().required('Please enter your CurrentPassword'),
    Password: Yup.string().required('Please enter your New Password'),
  });
  const { ChangePasswordError, SuccessMessage } = useSelector(
    (state) => state.Reducer
  );
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '120px',
      }}
    >
      <Formik
        initialValues={{
          CurrentPassword: '',
          Password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          dispatch(changePassword(values));
        }}
      >
        {({ errors, touched }) => (
          <Form style={{ minWidth: '350px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3%' }}>
              ChangePassword
            </h2>
            <h2
              style={{ textAlign: 'center', color: 'red', marginBottom: '3%' }}
            >
              {ChangePasswordError}
            </h2>
            <h2
              style={{
                textAlign: 'center',
                color: 'green',
                marginBottom: '3%',
              }}
            >
              {SuccessMessage}
            </h2>

            <div className="form-group">
              <label>CurrentPassword</label>
              <Field
                className={`form-control  ${
                  errors.CurrentPassword && touched.CurrentPassword
                    ? 'is-invalid'
                    : null
                }`}
                name="CurrentPassword"
                type="password"
              />
              {errors.CurrentPassword && touched.CurrentPassword ? (
                <small style={{ color: 'red' }}>{errors.CurrentPassword}</small>
              ) : null}
            </div>
            <div className="form-group">
              <label>NewPassword</label>
              <Field
                className={`form-control  ${
                  errors.Password && touched.Password ? 'is-invalid' : null
                } `}
                name="Password"
                type="password"
              />
              {errors.Password && touched.Password ? (
                <small style={{ color: 'red' }}>{errors.Password}</small>
              ) : null}
            </div>
            <br />
            <button
              style={{ width: '100%' }}
              className="btn btn-dark"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
