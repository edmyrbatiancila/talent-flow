const TalentFlowLogo = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-zinc-950 text-white shadow-sm">
                <svg
                    viewBox="0 0 32 32"
                    className="size-6"
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
            </div>

            <div>
                <p className="text-sm font-semibold leading-none text-zinc-950">TalentFlow</p>
                <p className="mt-1 text-xs text-zinc-500">Recruitment ATS</p>
            </div>
        </div>
    );
};

export default TalentFlowLogo;