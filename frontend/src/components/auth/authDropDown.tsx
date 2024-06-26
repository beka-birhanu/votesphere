function AuthDropDown(props: { onSelect: CallableFunction; options: string[] }) {
    function handleSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        props.onSelect(event.target.value);
    }

    const options = props.options;

    return (
        <div className='flex justify-end items-center gap-2'>
            <label htmlFor='role' className='text-xl'>
                Role
            </label>
            <select name='role' id='role' className='text-gray-700 rounded-lg p-1 px-8 focus:outline-none text-xl' onChange={handleSelection}>
                <option value={''} disabled selected hidden>
                    select role
                </option>
                {options.map((option) => (
                    <option value={option} key={option} className='text-xl'>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default AuthDropDown;
