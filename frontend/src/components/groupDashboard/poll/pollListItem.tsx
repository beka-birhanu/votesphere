import { useState } from 'react';
import PollOption from './option';
import { optionData } from './option';
import ToggleAccordionIcon from '../icons/toggleAccordionIcon';
import { castVote } from '../../../API/poll';

export type pollData = {
    id: string;
    chosenOptionId: string | null;
    question: string;
    options: { optionText: string; numberOfVotes: number; id: string }[];
    hasVoted: boolean;
    isClosed: boolean;
};

function preparePollsData(optionData: optionData[]) {
    optionData.sort((a, b) => b.id.localeCompare(a.id));
}

function PollListItem(props: { pollData: pollData; key: string }) {
    function toggleAccordion() {
        setIsAccordionOpen((isOpen) => !isOpen);
    }

    const [hasVoted, setHasVoted] = useState(props.pollData.hasVoted);
    const [isClosed, setIsClosed] = useState(props.pollData.isClosed);
    const [optionsData, setOptionsData] = useState(props.pollData.options);
    const [chosenOptionId, setChosenOptionId] = useState(props.pollData.chosenOptionId);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const iconColor = hasVoted || isClosed ? 'bg-[#ABACAD]' : 'bg-blue-700';

    const totalVoteCount = optionsData.reduce((accumulator, option) => accumulator + option.numberOfVotes, 0);
    const optionsWithPercent = optionsData.map((option) => ({
        id: option.id,
        optionText: option.optionText,
        votePercent: (option.numberOfVotes / totalVoteCount) * 100,
    }));

    const question = <h1 className='font-medium mx-2'>{props.pollData.question}</h1>;

    preparePollsData(optionsWithPercent);
    const options = optionsWithPercent.map((optionData) => (
        <PollOption
            data={optionData}
            displayVotePercent={hasVoted || isClosed}
            isChosen={chosenOptionId === optionData.id}
            onVote={handleVote}
        ></PollOption>
    ));

    const iconDirection = isAccordionOpen ? -90 : 90;
    const toggleAccordionButton = (
        <button>
            {' '}
            <ToggleAccordionIcon iconDirection={iconDirection}></ToggleAccordionIcon>{' '}
        </button>
    );

    async function handleVote(optionID: string) {
        try {
            const updatedData: pollData = (await castVote(props.pollData.id, optionID)).data;

            setHasVoted(true);
            setChosenOptionId(updatedData.chosenOptionId);
            setIsClosed(updatedData.isClosed);
            setOptionsData(updatedData.options);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='max-w-4xl w-full flex flex-col gap-5' key={props.key}>
            <section
                className='flex justify-between items-center p-3 hover:shadow-md border rounded-xl transition-all cursor-pointer'
                onClick={toggleAccordion}
            >
                <div className={`${iconColor} rounded-full p-4 w-8 h-8 flex justify-center items-center`}>
                    <p className='text-blue-50 pt-[1px] font-extrabold text-2xl'>?</p>
                </div>
                {question}
                {toggleAccordionButton}
            </section>
            {isAccordionOpen && <section className='flex flex-col px-6 py-4 gap-3 w-full'>{options}</section>}
        </section>
    );
}

export default PollListItem;
