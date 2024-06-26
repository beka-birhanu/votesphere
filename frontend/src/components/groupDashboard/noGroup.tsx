import CreateGroupForm from './createGroupForm';

function NoGroupForNonAdmin() {
    return (
        <div
            className='flex w-full m-8
        '
        >
            <div className='flex flex-col items-center gap-16 w-full'>
                <h1 className='text-center text-4xl text-gray-300 font-bold'> Group Membership Required!</h1>
                <p className='text-left text-2xl max-w-4xl'>
                    You are currently not a member of any group. To join a group, please contact the administrator of the group you wish to join and
                    request that they add you to their group. <br /> <br />
                    <br />
                    <strong className='font-normal'>
                        <span className='font-semibold'>Please note</span>: You can only be a member of one group at a time.
                    </strong>
                </p>
            </div>
        </div>
    );
}

function NoGroupFroAdmin(props: { username: string }) {
    return (
        <div
            className='flex w-full m-8
        '
        >
            <div className='flex flex-col items-center gap-16 w-full'>
                <h1 className='text-center text-4xl text-gray-300 font-bold'> Create Group!</h1>
                <CreateGroupForm username={props.username}></CreateGroupForm>
                <p className='text-left text-2xl max-w-4xl'>
                    <strong className='font-normal'>
                        <span className='font-semibold'>Please note</span>: You can only create one group.
                    </strong>
                </p>
            </div>
        </div>
    );
}
function NoGroup(props: { isAdmin: boolean; username: string }) {
    return props.isAdmin ? <NoGroupFroAdmin username={props.username}></NoGroupFroAdmin> : <NoGroupForNonAdmin></NoGroupForNonAdmin>;
}

export default NoGroup;
