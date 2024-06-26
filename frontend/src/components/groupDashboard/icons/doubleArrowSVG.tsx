function DoubleArrowIcon(props: { rotate: boolean }) {
    const rotationsClass = props.rotate ? '-rotate-45 sm:rotate-0' : 'rotate-45 sm:rotate-180';

    return (
        <svg
            fill='#cdcdcd'
            version='1.1'
            id='Capa_1'
            width='16px'
            height='24px'
            viewBox='0 0 220.682 220.682'
            stroke='#cdcdcd'
            className={rotationsClass}
        >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
                <g>
                    <polygon points='92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639'></polygon>
                    <polygon points='28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758'></polygon>
                </g>
            </g>
        </svg>
    );
}

export default DoubleArrowIcon;
