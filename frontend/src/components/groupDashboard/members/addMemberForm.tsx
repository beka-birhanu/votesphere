import { useContext, useEffect, useState } from 'react';
import useInput from '../../../hooks/use-input';
import Input from '../../auth/authInput';
import { validateUsername } from '../../auth/validators';
import LoadingSVG from '../icons/loadingSVG';
import { addMember } from '../../../API/group';
import axios from 'axios';
import { UserDataContext } from '../dashboard';

async function submit(
    groupID: string,
    username: string,
    setIsLoading: CallableFunction,
    setSubmitError: CallableFunction,
    closeModal: CallableFunction,
) {
    const NOT_FOUND = 404;
    const CONFLICT = 409;

    setIsLoading(true);

    try {
        await addMember(username, groupID);
        closeModal();
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === NOT_FOUND) {
                setSubmitError('Invalid username');
            } else if (error.response?.status === CONFLICT) {
                setSubmitError('User already belongs to another group');
            }
        }
    } finally {
        setIsLoading(false);
    }
}

function AddMemberForm(props: { onClose: CallableFunction }) {
    const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
        useInput(validateUsername);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const { groupID } = useContext(UserDataContext);

    const usernameInputField = (
        <Input
            type='username'
            onChange={setUsername}
            onBlur={usernameInputBlurHandler}
            value={username}
            error={submitError ? submitError : usernameInputError}
            isTouched={isUsernameInputTouched}
        ></Input>
    );

    useEffect(() => {
        const isUsernameEmpty = username === null || username === '';
        setSubmitError(null);

        setIsFormValid(!isUsernameEmpty);
    }, [username]);

    function handleClose(event: React.MouseEvent<HTMLElement>) {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (usernameInputError || isLoading) {
            return null;
        }

        submit(groupID, username, setIsLoading, setSubmitError, props.onClose);
    }

    return (
        <div onClick={handleClose} className='flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                    {usernameInputField}
                    <button
                        disabled={!isFormValid}
                        className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 flex justify-center gap-2 items-center'
                    >
                        {isLoading && <LoadingSVG></LoadingSVG>}
                        {isLoading ? 'Adding' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberForm;
