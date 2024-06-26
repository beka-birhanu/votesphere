import { Fragment } from 'react/jsx-runtime';
import AuthForm from './authForm';
import Header from '../header/header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Fragment>
            <Header isAuthorized={false} isLoading={isLoading}></Header>
            <div className='flex items-center min-h-[90vh] justify-center text-2xl'>
                <div className='max-w-3xl w-full rounded-xl sm:p-12 p-2 grid gap-16 sm:border-solid sm:border-[1px] sm:border-[#CDCDCD]'>
                    <hgroup>
                        <h1 className='text-4xl text-blue-800 tracking-wide text-center mb-10 font-bold'>Welcome!</h1>
                        <p className='uppercase tracking-widest text-gray-600 font-medium text-lg text-center'>Vote for what matters to you</p>
                    </hgroup>

                    {<AuthForm type='login' setIsLoading={setIsLoading}></AuthForm>}
                    <p className='text-center '>
                        New to Vote Sphere?{' '}
                        <Link to={'/sign-up'} className='text-blue-600 underline'>
                            {' '}
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
