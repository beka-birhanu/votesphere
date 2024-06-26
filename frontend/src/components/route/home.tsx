import { Navigate } from 'react-router-dom';

function Home() {
    const isAuthenticated = localStorage.getItem('accessToken') !== null;
    const page = isAuthenticated ? <Navigate to={'/dashboard'}></Navigate> : <Navigate to={'/sign-up'}></Navigate>;

    return page;
}

export default Home;
