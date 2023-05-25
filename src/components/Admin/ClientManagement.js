import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useState } from 'react';
import { AddData, SetEditData } from '../../service';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ClientEditData } from '../../action';
const SignupSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Name'),
  Phone: Yup.number().required('A phone number is required'),
  email: Yup.string().email().required('Please enter your Email Address'),
  Address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Address'),

  GST: Yup.number()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please Complete The Field'),
  Country: Yup.string().required('Please Select your Country'),
  Currency: Yup.string().required('Please Select your Currency'),
});
const SignupSchemaWithoutGst = Yup.object().shape({
  Name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Name'),
  Phone: Yup.number().required('A phone number is required'),
  email: Yup.string().email().required('Please enter your Email Address'),
  Address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your Address'),
  Country: Yup.string().required('Please Select your Country'),
  Currency: Yup.string().required('Please Select your Currency'),
});

const ClientManagement = () => {
  const { id } = useParams();
  const { clientEditData } = useSelector((state) => state.Reducer);
  const [gstval, setgstval] = useState(
    id ? (clientEditData?.GST !== '' ? true : false) : ''
  );
  const [SelectedImage, setSelectedImage] = useState(
    id ? clientEditData?.Image : ''
  );
  useEffect(() => {
    if (id) {
      dispatch(ClientEditData(id));
      setSelectedImage('');
    } else {
      dispatch({
        type: 'ResetEditData',
      });
      setgstval('');
      setSelectedImage('');
    }
  }, [id]);

  const [ImageError, setImageError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    >
      <div>
        <Formik
          initialValues={{
            Name: id ? clientEditData?.Name : '',
            Phone: id ? clientEditData?.Phone : '',
            email: id ? clientEditData?.email : '',
            Address: id ? clientEditData?.Address : '',
            GST: id ? clientEditData?.GST : '',
            Country: id ? clientEditData?.Country : '',
            Currency: id ? clientEditData?.Currency : '',
          }}
          validationSchema={gstval ? SignupSchema : SignupSchemaWithoutGst}
          onSubmit={(values) => {
            console.log('sds');

            if (id) {
              values = {
                ...values,
                Image: SelectedImage ? SelectedImage : clientEditData?.Image,
              };
              SetEditData(`/Client/${id}`, values);
              navigate('/ClientManagementList');
              setSelectedImage('');
            } else {
              if (!SelectedImage) {
                setImageError('Image is Required');
              } else {
                values = { ...values, Image: SelectedImage };
                AddData('Client', values);
                setImageError('');
                setSelectedImage('');
                navigate('/ClientManagementList');
              }
            }
          }}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form style={{ minWidth: '350px' }}>
              <h2 style={{ textAlign: 'center' }}>ClientManagement</h2>
              <div className="form-group">
                <label>Name</label>
                <Field
                  className={`form-control  ${
                    errors.Name && touched.Name ? 'is-invalid' : null
                  } `}
                  name="Name"
                />
                <small style={{ color: 'red' }}>
                  {errors.Name && touched.Name ? (
                    <div>{errors.Name}</div>
                  ) : null}
                </small>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <Field
                  type="number"
                  className={`form-control  ${
                    errors.Phone && touched.Phone ? 'is-invalid' : null
                  } `}
                  name="Phone"
                />
                <small style={{ color: 'red' }}>
                  {errors.Phone && touched.Phone ? (
                    <div>{errors.Phone}</div>
                  ) : null}
                </small>
              </div>
              <div className="form-group">
                <label>Email</label>
                <Field
                  className={`form-control  ${
                    errors.email && touched.email ? 'is-invalid' : null
                  } `}
                  name="email"
                  type="email"
                />
                <small style={{ color: 'red' }}>
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </small>
              </div>
              <div className="form-group">
                <label>Address</label>
                <Field
                  as="textarea"
                  className={`form-control  ${
                    errors.Address && touched.Address ? 'is-invalid' : null
                  } `}
                  name="Address"
                />
                <small style={{ color: 'red' }}>
                  {errors.Address && touched.Address ? (
                    <div>{errors.Address}</div>
                  ) : null}
                </small>
              </div>
              <label>GST</label>
              <br></br>
              <input
                checked={gstval}
                type="checkbox"
                onChange={(e) => {
                  setgstval(e.target.checked);
                }}
              />
              <br />
              {gstval ? (
                <div className="form-group">
                  <Field
                    className={`form-control  ${
                      errors.GST && touched.GST ? 'is-invalid' : null
                    } `}
                    name="GST"
                  />
                  <small style={{ color: 'red' }}>
                    {errors.GST && touched.GST ? <div>{errors.GST}</div> : null}
                  </small>
                </div>
              ) : null}
              <br />
              <label>Image</label>
              <ImageUploader
                singleImage={true}
                withIcon={true}
                withPreview={true}
                buttonText="Choose images"
                imgExtension={['.jpeg', '.jpg', '.png', '.gif']}
                maxFileSize={3242880}
                onChange={(pictureFiles, pictureDataURLs) =>
                  setSelectedImage(pictureDataURLs)
                }
              />
              {clientEditData?.Image && id ? (
                <img
                  style={{ height: '25vh', width: '100%' }}
                  src={SelectedImage || clientEditData?.Image}
                ></img>
              ) : null}

              <small style={{ color: 'red' }}>{ImageError}</small>
              <div className="form-group">
                <label>Country</label>
                <Field
                  as="select"
                  className={`form-control  ${
                    errors.Country && touched.Country ? 'is-invalid' : null
                  } `}
                  name="Country"
                >
                  <option value="">Select Your Country</option>
                  <option value="Germany">Germany</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                </Field>
                <small style={{ color: 'red' }}>
                  {errors.Country && touched.Country ? (
                    <div>{errors.Country}</div>
                  ) : null}
                </small>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <Field
                  as="select"
                  className={`form-control  ${
                    errors.Currency && touched.Currency ? 'is-invalid' : null
                  } `}
                  name="Currency"
                >
                  <option value="">Select Your Country</option>
                  <option value="Euro">Euro</option>
                  <option value="	Albanian lek"> Albanian lek</option>
                  <option value="Algerian dinar">Algerian dinar</option>
                  <option value="	Angolan kwanza"> Angolan kwanza</option>
                </Field>
                <small style={{ color: 'red' }}>
                  {errors.Currency && touched.Currency ? (
                    <div>{errors.Currency}</div>
                  ) : null}
                </small>
              </div>
              <button
                style={{ marginTop: '5px', width: '100%' }}
                className="btn btn-dark"
                type="submit"
              >
                Submit
              </button>
              <button
                style={{ marginTop: '5px', width: '100%' }}
                className="btn btn-dark"
                onClick={() => navigate('/ClientManagementList')}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ClientManagement;
