export type ApplicationStage = 
    | 'applied'
    | 'screening'
    | 'interview'
    | 'assessment'
    | 'offer'
    | 'hired'
    | 'rejected';

export type ApplicationApplicant = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string | null;
    resume_path: string | null;
    cover_letter: string | null;
    created_at: string;
};

export type JobOpeningApplication = {
    id: number;
    stage: ApplicationStage | null;
    applied_at: string | null;
    hired_at: string | null;
    rejected_at: string | null;
    applicant?: ApplicationApplicant;
};