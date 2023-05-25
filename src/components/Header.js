import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
const LINK = styled(Link)`
  text-decoration: none;
  font-size: 27px;
  font-weight: bold;
  color: white;
  margin-left: 40px;
  margin-bottom: 5px;
  width: 18%;
`;
const LInk = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-left: 40px;
`;
const BUTTON = styled.button`
  border: none;
  padding: 0.4%;
  margin-right: 40px;
  border-radius: 8px;
  margin-left: 37px;
  width: 70px;
`;
const BUTTONLOGIN = styled.button`
  border: none;
  padding: 0.6%;
  border-radius: 8px;
  margin-right: 40px;
  width: 80px;
`;
const Header = () => {
  const { pathname } = useLocation();
  let { IsSignedIn } = useSelector((state) => state.Reducer);
  IsSignedIn = JSON.parse(IsSignedIn);
  const dispatch = useDispatch();
  return (
    <>
      {IsSignedIn ? (
        <Navbar
          // style={{ position: 'fixed', zIndex: '1', width: '100%' }}
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <LINK to="/">Accounts</LINK>
          <Navbar.Toggle
            style={{ marginBottom: '15px', marginRight: '4.6%' }}
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LInk
                style={{
                  color: `${pathname === '/dashboard' ? '#0feef2' : 'white'}`,
                }}
                to="dashboard"
              >
                Dashboard
              </LInk>

              <LInk
                style={{
                  color: `${
                    pathname === '/ClientManagementList' ? '#0feef2' : 'white'
                  }`,
                }}
                to="ClientManagementList"
              >
                Client Management
              </LInk>

              <LInk
                style={{
                  color: `${pathname === '/Invoice' ? '#0feef2' : 'white'}`,
                }}
                to="Invoice"
              >
                Invoice
              </LInk>
              <LInk
                style={{
                  color: `${pathname === '/Report' ? '#0feef2' : 'white'}`,
                }}
                to="Report"
              >
                Report
              </LInk>
              <LInk
                style={{
                  color: `${
                    pathname === '/ChangePassword' ? '#0feef2' : 'white'
                  }`,
                }}
                to="ChangePassword"
              >
                ChangePassword
              </LInk>
            </Nav>
            <BUTTON
              onClick={() => {
                dispatch({
                  type: 'Logout',
                });
              }}
            >
              LogOut
            </BUTTON>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar
          style={{ display: 'flex', justifyContent: 'space-between' }}
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <LINK to="/">Accounts</LINK>
          <LINK to="/login">Login</LINK>
        </Navbar>
      )}
    </>
  );
};

export default Header;
