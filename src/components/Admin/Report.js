import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetInvoices } from '../../action';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { DeleteData } from '../../service';
const Report = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ country: '', client: '' });

  const {
    Reducer: { invoices },
  } = useSelector((state) => state);

  let countryArray;
  let clientArray;

  let filteredInvoices = invoices;

  if (filters.client || filters.country) {
    if (filters.client) {
      filteredInvoices = filteredInvoices.filter(
        ({ percentage: { Name } }) => Name === filters.client
      );
    }
    if (filters.country) {
      filteredInvoices = filteredInvoices.filter(
        ({ percentage: { Country } }) => Country === filters.country
      );
    }
  }

  console.log(filteredInvoices);
  if (invoices) {
    countryArray = invoices.map(({ percentage }) => percentage.Country);
    clientArray = invoices.map(({ percentage }) => percentage.Name);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInvoices());
  }, []);

  const Display = filteredInvoices?.map((e, index) => {
    return (
      <div
        style={{
          width: '340px',
          marginBottom: '3%',
          border: '1px solid grey',
          marginTop: '40px',
        }}
        className="card"
        key={index}
      >
        <div>
          <img
            style={{ width: '100%', height: '30vh' }}
            src={e.percentage?.Image || e.Percentage?.Image}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {e.percentage?.Name || e.Percentage?.Name}
          </h5>
          <p className="card-text">
            {e.percentage?.Address || e.Percentage?.Address}
          </p>
          <p className="card-text">
            {e.percentage?.Phone || e.Percentage?.Phone}
          </p>
          <p className="card-text">
            {e.percentage?.Currency || e.Percentage?.Currency}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {e.percentage?.Email || e.Percentage?.Email}
            </small>
          </p>
          <Link
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '3%',
              paddingRight: '7%',
              paddingLeft: '7%',
              paddingTop: '3.7%',
              paddingBottom: '3.7%',
              background: '#212529',
              borderRadius: '5px',
            }}
            to={`/InvoiceEdit/${e.id}`}
          >
            Edit
          </Link>
          <button
            onClick={() => {
              DeleteData(`/Invoice/${e.id}`);
              navigate('/Report');
              dispatch(GetInvoices());
            }}
            style={{
              marginLeft: '2px',
              marginRight: '2px',
              color: 'white',
              padding: '2.7%',
              border: 'none',
              paddingRight: '8%',
              paddingLeft: '8%',
              background: '#212529',
              borderRadius: '5px',
            }}
          >
            Delete
          </button>
          <CSVLink
            style={{
              textDecoration: 'none',
              color: 'white',
              padding: '3%',
              paddingRight: '7%',
              paddingLeft: '7%',
              paddingTop: '3.7%',
              paddingBottom: '3.7%',
              background: '#212529',
              borderRadius: '5px',
            }}
            data={[e]}
          >
            Csv/Excel
          </CSVLink>
        </div>
      </div>
    );
  });

  const countryOption = countryArray?.map((eachCountry, index) => (
    <option key={index} value={eachCountry}>
      {eachCountry}
    </option>
  ));

  const clientOption = clientArray?.map((eachClient, index) => (
    <option key={index} value={eachClient}>
      {eachClient}
    </option>
  ));

  return (
    <div>
      <label htmlFor="country" className="m-1">
        Choose a Country:
      </label>

      <select
        name="country"
        id="country"
        value={filters.country}
        onChange={({ target: { value } }) =>
          setFilters({ ...filters, country: value })
        }
      >
        {countryOption ? (
          <>
            <option value="">Choose a Country</option>
            {countryOption}
          </>
        ) : (
          <option value="">Options Loading...</option>
        )}
      </select>
      <label htmlFor="cars" className="m-1">
        Choose a Client:
      </label>

      <select
        name="client"
        id="client"
        onChange={({ target: { value } }) =>
          setFilters({ ...filters, client: value })
        }
      >
        <option value="">Choose a Client</option>
        {clientOption}
      </select>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {Display}
      </div>
    </div>
  );
};

export default Report;
