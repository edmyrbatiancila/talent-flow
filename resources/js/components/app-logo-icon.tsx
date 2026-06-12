import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M7 8.5H25M16 8.5V25M10.5 16H21.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />

            <path
                d="M8.5 23.5C12.5 20.5 19.5 20.5 23.5 23.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}
