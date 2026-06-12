export type JobOpening = {
    id: number;
    title: string;
    department: string;
    employment_type: string;
    location: string;
    salary_min: number | null;
    salary_max: number | null;
    description: string;
    status: string;
    archived_at: string | null;
    created_at: string;
    user?: {
        id: number;
        name: string;
    };
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedJobOpenings = {
    data: JobOpening[];
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

export type JobOpeningFilters = {
    search?: string;
    status?: string;
};
