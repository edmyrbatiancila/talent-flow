import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { JobOpeningApplication } from '@/types/Application';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatSalary(min: number | null, max: number | null) {
    if (!min && !max) {
        return 'Salary undisclosed';
    }

    if (min && max) {
        return `PHP ${min.toLocaleString()} - PHP ${max.toLocaleString()}`;
    }

    if (min) {
        return `From PHP ${min.toLocaleString()}`;
    }

    return `Up to PHP ${max?.toLocaleString()}`;
}

export const formatter = new Intl.NumberFormat();

export function labelFromValue(value: string) {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatDate(value: string | null) {
    if (!value) {
        return 'Not set';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

export function getInitials(application: JobOpeningApplication) {
    const applicant = application.applicant;

    if (!applicant) {
        return 'A';
    }

    return `${applicant.first_name[0] ?? ''}${applicant.last_name[0] ?? ''}`
        .toUpperCase()
        .trim();
}