import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
