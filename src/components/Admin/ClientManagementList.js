import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetClientData } from '../../action';
import { DeleteData } from '../../service';
const ClientManagementList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClientData());
  }, []);
  const { ClientData } = useSelector((state) => state.Reducer);
  console.log(ClientData);
  const Listing = ClientData?.map((e, index) => {
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
            src={e.Image}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{e.Name}</h5>
          <p className="card-text">{e.Address}</p>
          <p className="card-text">{e.Phone}</p>
          <p className="card-text">
            <small className="text-muted">{e.email}</small>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              to={`/Edit/${e.id}`}
            >
              Edit
            </Link>
            <button
              onClick={() => {
                DeleteData(`/Client/${e.id}`);
                navigate('/ClientManagementList');
                dispatch(GetClientData());
              }}
              style={{
                color: 'white',
                padding: '3%',
                border: 'none',
                paddingRight: '10%',
                paddingLeft: '10%',
                background: '#212529',
                borderRadius: '5px',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => navigate('/ClientManagement')}
      >
        Add Clients
      </button>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '7%',
        }}
      >
        {Listing}
      </div>
    </div>
  );
};
export default ClientManagementList;
