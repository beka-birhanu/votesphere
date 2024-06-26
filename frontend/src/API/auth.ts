import axios from 'axios';
import axiosInstance from './axiosInstance';

type successResponse = {
    username: string;
    role: string;
    groupID: null | string;
    accessToken: string;
    refreshToken: string;
};

type errorResponse = {
    message: string;
    error: string;
    statusCode: number;
};

type errorDetail = {
    emailError: null | string;
    passwordError: null | string;
    usernameError: null | string;
    serverError: null | string;
};

export type signUpFormData = {
    email: string;
    username: string;
    password: string;
    role: string | null;
};

export type signInFormData = { username: string; password: string };

async function sendData(
    url: string,
    formData: signInFormData | signUpFormData,
    setIsLoading: CallableFunction,
): Promise<{ isSuccess: boolean; data: successResponse | errorResponse } | null> {
    try {
        setIsLoading(true);

        const response = await axios.post(url, formData);
        const successData: successResponse = response.data;

        return { isSuccess: true, data: successData };
    } catch (error: any) {
        if (error.response) {
            const errorData: errorResponse = error.response.data;

            return { isSuccess: false, data: errorData };
        }

        console.log(error.message);

        return null;
    } finally {
        setIsLoading(false);
    }
}

export async function handleSignUpSubmit(formData: signUpFormData, setSubmitError: CallableFunction, setIsLoading: CallableFunction) {
    const url = 'http://localhost:9000/auth/signup';
    const response = await sendData(url, formData, setIsLoading);
    const errorDetails: errorDetail = { emailError: null, passwordError: null, usernameError: null, serverError: null };

    if (!response) {
        errorDetails.serverError = 'Server Error';
    } else if (response.isSuccess) {
        const { username, groupID, role, accessToken, refreshToken } = response.data as successResponse;

        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (groupID) localStorage.setItem('groupID', groupID.toString());
    } else {
        if (response.data && 'message' in response.data) {
            const errorMessage = response.data.message;
            const isErrorAboutUsername = errorMessage.includes('username');

            if (isErrorAboutUsername) {
                errorDetails.usernameError = errorMessage;
            } else {
                errorDetails.emailError = errorMessage;
            }
        }
    }
    setSubmitError(errorDetails);

    return response?.isSuccess;
}

export async function handleSignInSubmit(formData: signInFormData, setSubmitError: CallableFunction, setIsLoading: CallableFunction) {
    const url = 'http://localhost:9000/auth/signin';
    const response = await sendData(url, formData, setIsLoading);
    const errorDetails: errorDetail = { emailError: null, passwordError: null, usernameError: null, serverError: null };

    if (!response) {
        errorDetails.serverError = 'Server Error';
    } else if (response.isSuccess) {
        const { username, groupID, role, accessToken, refreshToken } = response.data as successResponse;

        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (groupID) localStorage.setItem('groupID', groupID.toString());
    } else {
        if (response.data && 'message' in response.data) {
            const errorMessage = response.data.message;
            const isErrorAboutUsername = errorMessage.includes('username');

            if (isErrorAboutUsername) {
                errorDetails.usernameError = errorMessage;
            } else {
                errorDetails.passwordError = errorMessage;
            }
        }
    }
    setSubmitError(errorDetails);

    return response?.isSuccess;
}

export async function handleSignOut() {
    const url = '/auth/signout';

    const itemsToRemove = ['username', 'role', 'accessToken', 'refreshToken', 'groupID'];

    try {
        const response = await axiosInstance.patch(url);

        if (response) itemsToRemove.forEach((item) => localStorage.removeItem(item));

        return response;
    } catch (error) {
        console.error('Error during sign out:', error);
        throw error; // Re-throw the error after logging it
    }
}
