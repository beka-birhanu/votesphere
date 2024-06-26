import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem('accessToken');

    return token ? <>{children}</> : <Navigate to='/login' />;
}

export default PrivateRoute;
