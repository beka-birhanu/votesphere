import '../../index.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import { handleSignOut } from '../../API/auth';

function Header(props: { isAuthorized: boolean; isLoading: boolean }) {
    const loadingBar = <div className={`w-[100%] bg-blue-400 h-1  rounded-xl animate-pulse`}></div>;
    const signOutLink = (
        <button className='font-medium hover:underline' onClick={logout}>
            Sign out
        </button>
    );
    const navigate = useNavigate();

    async function logout() {
        if (await handleSignOut()) navigate('/login');
    }

    return (
        <div className='py-5'>
            <header className='md:pr-32 py-5 w-full px-9 flex justify-between items-center text-2xl'>
                <div className='flex items-end gap-3'>
                    <img className='w-9' src={logo} alt='logo' />
                    <h1 className='text-2xl uppercase font-bold tracking-wider'>Vote Sphere</h1>
                </div>
                {props.isAuthorized && signOutLink}
            </header>
            {props.isLoading && loadingBar}
        </div>
    );
}

export default Header;
