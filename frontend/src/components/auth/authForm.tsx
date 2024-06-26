import Input from './authInput';
import useInput from '../../hooks/use-input';
import { validateEmail, validatePasswordForSignUp, validatePasswordForSignIn, validateUsername } from './validators';
import { useEffect, useState } from 'react';
import AuthDropDown from './authDropDown';
import { handleSignInSubmit, handleSignUpSubmit, signUpFormData } from '../../API/auth';
import { useNavigate } from 'react-router-dom';

type formError = {
    emailInputError: null | string;
    usernameInputError: null | string;
    passwordInputError: null | string;
};

function checkFromValidity(formType: string, formData: signUpFormData, formErrors: formError): boolean | undefined {
    const { email, username, password, role } = formData;
    const { emailInputError, usernameInputError, passwordInputError } = formErrors;

    const isEmailEmpty = email === null || email === '';
    const isUsernameEmpty = username === null || username === '';
    const isPasswordEmpty = password === null || password === '';
    const isRoleEmpty = role === null || role == '';

    let atLeastOneError;
    let atLeastOneEmpty;

    if (formType === 'sign up') {
        atLeastOneError = emailInputError !== null || usernameInputError !== null || passwordInputError !== null;
        atLeastOneEmpty = isEmailEmpty || isUsernameEmpty || isPasswordEmpty || isRoleEmpty;
    } else if (formType === 'login') {
        atLeastOneError = usernameInputError !== null || passwordInputError !== null;
        atLeastOneEmpty = isUsernameEmpty || isPasswordEmpty;
    }
    return (atLeastOneEmpty || atLeastOneError) === false;
}

function AuthForm(props: { type: 'login' | 'sign up'; setIsLoading: CallableFunction }) {
    const navigate = useNavigate();
    const passwordValidator = props.type === 'sign up' ? validatePasswordForSignUp : validatePasswordForSignIn;

    const [email, isEmailInputTouched, emailInputError, setEmail, blurEmailInput, resetEmailInput] = useInput(validateEmail);
    const [username, isUsernameInputTouched, usernameInputError, setUsername, blurUsernameInputBlur, resetUsernameInput] = useInput(validateUsername);
    const [password, isPasswordInputTouched, passwordInputError, setPassword, blurPasswordInput, resetPasswordInput] = useInput(passwordValidator);

    const [role, setRole] = useState(null);
    const [formHasError, setFormHasError] = useState(true);
    const [submitError, setSubmitError] = useState({ emailError: null, usernameError: null, serverError: null, passwordError: null });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = { email, username, password, role };
        let isSuccess;

        if (props.type === 'sign up') {
            isSuccess = await handleSignUpSubmit(formData, setSubmitError, props.setIsLoading);
        } else {
            isSuccess = await handleSignInSubmit(formData, setSubmitError, props.setIsLoading);
        }

        if (isSuccess) {
            setSubmitSuccess(true);
        }
    }

    useEffect(() => {
        const formData = { email, username, password, role };
        const formErrors = { emailInputError, usernameInputError, passwordInputError };
        const isValid = checkFromValidity(props.type, formData, formErrors);

        setFormHasError(!isValid);
        setSubmitError({ emailError: null, usernameError: null, serverError: null, passwordError: null });
    }, [emailInputError, usernameInputError, passwordInputError, email, username, password, role]);

    useEffect(() => {
        if (submitSuccess) {
            resetEmailInput();
            resetPasswordInput();
            resetUsernameInput();

            navigate('/dashboard');
        }
    }, [submitSuccess, navigate]);

    const emailInputField = (
        <Input
            type='email'
            onChange={setEmail}
            onBlur={blurEmailInput}
            value={email}
            error={emailInputError ? emailInputError : submitError.emailError}
            isTouched={isEmailInputTouched}
        ></Input>
    );

    const usernameInputField = (
        <Input
            type='username'
            onChange={setUsername}
            onBlur={blurUsernameInputBlur}
            value={username}
            error={usernameInputError ? usernameInputError : submitError.usernameError}
            isTouched={isUsernameInputTouched}
        ></Input>
    );

    const passwordInputField = (
        <Input
            type='password'
            onChange={setPassword}
            onBlur={blurPasswordInput}
            value={password}
            error={passwordInputError ? usernameInputError : submitError.passwordError}
            isTouched={isPasswordInputTouched}
        ></Input>
    );

    return (
        <form className='flex flex-col justify-stretch gap-16' onSubmit={handleSubmit}>
            <div className='flex flex-col justify-stretch sm:p-12 p-2'>
                {props.type === 'sign up' && emailInputField} {usernameInputField} {passwordInputField}
                {props.type === 'sign up' && <AuthDropDown onSelect={setRole} options={['User', 'Admin']}></AuthDropDown>}
            </div>
            <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500' disabled={formHasError}>
                {props.type}
            </button>
        </form>
    );
}

export default AuthForm;
