function ToggleAccordionIcon(props: { iconDirection: number }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='#ABACAD'
            style={{ transform: `rotate(${props.iconDirection}deg)` }}
            className='transition-all ease-in-out'
        >
            <path d='M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z' />
        </svg>
    );
}

export default ToggleAccordionIcon;
