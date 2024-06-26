import { startTransition, useState } from 'react';
import PollListItem, { pollData } from './pollListItem';
import { createPortal } from 'react-dom';
import AddPollForm from './addPollForm';

const noContent = (
    <div className='flex w-full justify-center justify-items-start font-bold text-3xl mt-32 text-gray-400'>
        <p>No polls found!</p>
    </div>
);

function sortPollsByVotedStatusLast(poll: pollData): string {
    // Prefixing with '1-' or '0-' to ensure 'voted' polls come last
    return `${poll.hasVoted ? '0-' : '1-'}` + poll.id;
}

function preparePollsData(pollsData: pollData[] | null) {
    if (pollsData) pollsData.sort((a, b) => sortPollsByVotedStatusLast(b).localeCompare(sortPollsByVotedStatusLast(a)));
}

function PollList(props: { pollsData: pollData[] | null }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleAddPollForm() {
        startTransition(() =>
            setIsModalOpen((prev) => {
                return !prev;
            }),
        );
    }
    const addPollButton = (
        <button
            onClick={toggleAddPollForm}
            className={`bg-blue-600 rounded-full p-4 w-8 h-8 flex justify-center items-center shadow-2xl shadow-black hover:scale-105`}
        >
            <p className='text-blue-50 pl-[1px] text-5xl'>+</p>
        </button>
    );

    preparePollsData(props.pollsData);
    const content = props.pollsData
        ? props.pollsData.map((pollData) => <PollListItem key={pollData.id} pollData={pollData}></PollListItem>)
        : noContent;

    return (
        <section className='flex flex-col items-center justify-center gap-5 w-full '>
            {addPollButton}
            {content}
            {isModalOpen &&
                createPortal(<AddPollForm onClose={toggleAddPollForm}></AddPollForm>, document.getElementById('modal-root') as HTMLElement)}
        </section>
    );
}

export default PollList;
