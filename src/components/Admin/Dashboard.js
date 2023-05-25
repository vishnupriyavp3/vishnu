import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetClientData, GetInvoices } from '../../action';
const Couter = styled.div`
  width: 40vw;
  background-color: #212529;
  height: 25vh;
  margin-top: 15vh;
`;
const Dashboard = () => {
  const { invoices } = useSelector((state) => state.Reducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInvoices());
    dispatch(GetClientData());
  }, []);
  let sum = null;
  invoices?.map((e) => (sum += JSON.parse(e.Amount)));
  const { ClientData } = useSelector((state) => state.Reducer);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Couter>
          <div
            style={{
              display: 'flex',
              marginTop: '10%',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h5 style={{ color: 'white' }}>No of Clients</h5>
            <p style={{ fontSize: '30px', color: 'white' }}>
              {ClientData?.length}
            </p>
          </div>
        </Couter>
        <Couter
          style={{
            marginLeft: '10%',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginTop: '10%',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h5 style={{ color: 'white' }}>No of invoices</h5>
            <p style={{ fontSize: '30px', color: 'white' }}>
              {invoices?.length}
            </p>
          </div>
        </Couter>
      </div>
      <div style={{ display: 'flex' }}>
        <Couter>
          <div
            style={{
              display: 'flex',
              marginTop: '10%',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h5 style={{ color: 'white' }}>Total Income</h5>
            <p style={{ fontSize: '30px', color: 'white' }}>{sum}</p>
          </div>
        </Couter>
        <Couter
          style={{
            marginLeft: '10%',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginTop: '10%',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h5 style={{ color: 'white' }}>Pending/Credited</h5>
            <p style={{ fontSize: '30px', color: 'white' }}>
              {invoices?.length}
            </p>
          </div>
        </Couter>
      </div>
    </>
  );
};

export default Dashboard;
