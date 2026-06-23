import type { JobOpening, PaginationLink } from '@/types/JobOpening';
import type { ApplicationStage } from '../Application';

// export type ApplicationStage =
//     | 'applied'
//     | 'screening'
//     | 'interview'
//     | 'assessment'
//     | 'offer'
//     | 'hired'
//     | 'rejected';

export type ApplicantApplication = {
    id: number;
    stage: ApplicationStage | null;
    applied_at: string | null;
    hired_at: string | null;
    rejected_at: string | null;
    job_opening?: JobOpening;
};

export type Applicant = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string | null;
    resume_path: string | null;
    cover_letter: string | null;
    created_at: string;
    applications: ApplicantApplication[];
};

export type PaginatedApplicants = {
    data: Applicant[];
    links: PaginationLink[];
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: PaginationLink[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
};

export type ApplicantFilters = {
    search?: string;
    stage?: ApplicationStage;
    job_opening_id?: string;
    applied_from?: string;
    applied_until?: string;
};
