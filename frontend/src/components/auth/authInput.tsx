import { ChangeEventHandler, FocusEventHandler, useEffect, useState } from 'react';
import UserIconSVG from './SVG/userIconSVG';
import EmailIconSVG from './SVG/emailIconSVG';
import PasswordIconSVG from './SVG/passwordIconSVG';
import ErrorIcon from './SVG/errorIconSVG';

const userIconSVG = <UserIconSVG />;
const emailIconSVG = <EmailIconSVG />;
const passwordIconSVG = <PasswordIconSVG />;
const errorIcon = <ErrorIcon />;

const nonErrorStyleClassName = 'border-[1px] border-[#CDCDCD] hover:border-gray-400';
const errorStyleClassName = 'border-[1px] border-red-400 hover:border-red-400';

function Input(props: {
    type: 'username' | 'email' | 'password';
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: FocusEventHandler<HTMLInputElement>;
    value: string;
    error: string | null;
    isTouched: boolean;
}) {
    const [showError, setShowError] = useState(false);
    let icon;

    if (props.type === 'username') {
        icon = userIconSVG;
    } else if (props.type === 'email') {
        icon = emailIconSVG;
    } else if (props.type === 'password') {
        icon = passwordIconSVG;
    }

    useEffect(() => {
        setShowError(props.error !== null && props.isTouched);
    }, [props.error, props.isTouched]);

    const borderStyle = showError ? errorStyleClassName : nonErrorStyleClassName;
    const errorMessage = props.error?.toString();

    return (
        <div className='flex flex-col gap-2 mb-6 md:mb-8'>
            <div className={`flex items-center text-lg border-solid rounded-xl shadow-sm ${borderStyle}`}>
                {icon}

                <input
                    type={props.type === 'username' ? 'text' : props.type}
                    placeholder={'Enter ' + props.type}
                    name={props.type}
                    id={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className='rounded pl-12 py-2 md:py-4 focus:outline-none w-full ml-5 text-2xl text-gray-700'
                />
            </div>
            {showError && (
                <div className='flex gap-1 pl-6'>
                    {errorIcon}
                    <p className='text-sm text-red-500'>{errorMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Input;
