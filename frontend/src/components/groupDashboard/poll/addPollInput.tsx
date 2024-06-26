function AddPollInput(props: { label: string; onChange: CallableFunction; value: string; required: boolean }) {
    return (
        <div className='ml-6 flex flex-col sm:flex-row justify-items-stretch text-xl'>
            <label htmlFor={props.label} className='mr-6'>
                {' '}
                {props.label}:
            </label>
            <input
                id={props.label}
                type='text'
                className='border-b-2 border-gray-400 focus:outline-none flex-grow w-full'
                multiple={true}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                required={props.required}
            />
        </div>
    );
}
export default AddPollInput;
