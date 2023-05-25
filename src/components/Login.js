import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { GetAdminDetails } from '../action';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  let { IsSignedIn, SignInError } = useSelector((state) => state.Reducer);
  IsSignedIn = JSON.parse(IsSignedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (IsSignedIn) {
      navigate('/');
    }
  }, [IsSignedIn]);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your Email Address'),
    Password: Yup.string().required('Please enter your Password'),
  });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2%',
      }}
    >
      <Formik
        initialValues={{
          email: '',
          Password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          dispatch(GetAdminDetails(values));
        }}
      >
        {({ errors, touched }) => (
          <Form style={{ minWidth: '350px' }}>
            <h1 style={{ textAlign: 'center' }}>SignIn</h1>
            <h2 style={{ color: 'red', textAlign: 'center' }}>{SignInError}</h2>
            <div className="form-group">
              <label>Email address</label>
              <Field
                className={`form-control  ${
                  errors.email && touched.email ? 'is-invalid' : null
                }`}
                name="email"
                type="email"
              />
              {errors.email && touched.email ? (
                <small style={{ color: 'red' }}>{errors.email}</small>
              ) : null}
            </div>
            <div className="form-group">
              <label>Password</label>
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

export default Login;
