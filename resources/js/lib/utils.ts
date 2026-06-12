import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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