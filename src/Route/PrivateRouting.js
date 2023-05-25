import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  let { IsSignedIn } = useSelector((state) => state.Reducer);
  IsSignedIn = JSON.parse(IsSignedIn);
  if (!IsSignedIn) {
    return <Navigate to="/login" state={{}} />;
  }

  return children;
};
export default PrivateRoute;
