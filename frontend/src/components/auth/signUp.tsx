import { Fragment } from 'react/jsx-runtime';
import AuthForm from './authForm';
import Header from '../header/header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const welcomeMessage = 'Welcome';
const motto = 'Vote for what matters to you';

function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Fragment>
            <Header isAuthorized={true} isLoading={isLoading}></Header>
            <div className='flex items-center min-h-[90vh] justify-center text-2xl'>
                <div className='max-w-3xl w-full rounded-xl sm:p-12 p-2 grid gap-16 sm:border-solid sm:border-[1px] sm:border-[#CDCDCD]'>
                    <hgroup>
                        <h1 className='text-4xl text-blue-800 tracking-wide text-center mb-10 font-bold'>{welcomeMessage}</h1>
                        <p className='uppercase tracking-widest text-gray-600 font-medium text-lg text-center'>{motto}</p>
                    </hgroup>

                    {<AuthForm type='sign up' setIsLoading={setIsLoading}></AuthForm>}
                    <p className='text-center '>
                        Already have account?{' '}
                        <Link to={'/login'} className='text-blue-600 underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default SignUp;
