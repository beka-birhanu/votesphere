export type memberData = { username: string; email: string; isAdmin: boolean };

const adminMark = (
    <div className='rounded-full bg-blue-700 w-4 h-4 p-[1px] flex justify-center items-center'>
        <p className='text-blue-50 pt-[1px] font-extrabold text-sm'>&#x2713;</p>
    </div>
);
function MembersListItem(props: memberData) {
    return (
        <li>
            <div>
                <div className='flex gap-1 items-center'>
                    <p className='font-medium'>{props.username}</p>
                    {props.isAdmin && adminMark}
                </div>
                <div className='px-2 text-sm'>
                    <p>{props.email}</p>
                </div>
            </div>
        </li>
    );
}

export default MembersListItem;
