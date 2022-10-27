import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ loggedIn, navigateTo, children }) {
  const link = (navigateTo ? navigateTo : '/signin');
  return (
    loggedIn ? children : <Navigate to={link} />
  );
};

export default ProtectedRoute;
