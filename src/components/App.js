import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Route/PrivateRouting';
import ChangePassword from './Admin/ChangePassword';
import Header from './Header';
import Login from './Login';
import Dashboard from './Admin/Dashboard';
import ClientManagement from './Admin/ClientManagement';
import Invoice from './Admin/Invoice';
import Report from './Admin/Report';
import ClientManagementList from './Admin/ClientManagementList';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/ClientManagement"
            element={
              <PrivateRoute>
                <ClientManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/Edit/:id"
            element={
              <PrivateRoute>
                <ClientManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/ChangePassword"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path="/Invoice"
            element={
              <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            }
          />
          <Route
           exact path="/InvoiceEdit/:id"
            element={
              <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/Report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/ClientManagementList"
            element={
              <PrivateRoute>
                <ClientManagementList />
              </PrivateRoute>
            }
          />
          s
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
