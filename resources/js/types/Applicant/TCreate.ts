export type ApplicantForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    resume: File | null;
    cover_letter: string;
    job_opening_id: string;
};

export type JobOpeningOption = {
    id: number;
    title: string;
};
