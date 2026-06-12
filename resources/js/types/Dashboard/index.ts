export type StatKey = 
    | 'jobOpenings'
    | 'openJobOpenings'
    | 'applicants'
    | 'applications'
    | 'hired'
    | 'rejected';

export interface Pipeline {
    stage: string;
    label: string;
    total: number;
}

export interface RecentJobOpenings {
    id: number;
    title: string;
    department: string;
    status: string;
    applications_count: number;
}

export interface RecentApplications {
    id: number;
    applicant: string;
    job: string;
    stage: string;
    applied_at: string | null;
}

export type DashboardProps = {
    stats: Record<StatKey, number>;
    pipeline: Pipeline[];
    recentJobOpenings: RecentJobOpenings[];
    recentApplications: RecentApplications[];
}