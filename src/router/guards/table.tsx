import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/selectors/user';

export default function RequireAuth({ children }: { children: ReactNode }) {
    const location = useLocation();
    const user = useSelector(selectCurrentUser);

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
