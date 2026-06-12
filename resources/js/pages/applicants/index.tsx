import { Head, Link, router } from '@inertiajs/react';
import {
    CalendarClock,
    Edit,
    Eye,
    FileText,
    FileUser,
    Filter,
    Mail,
    Phone,
    Plus,
    Search,
    SlidersHorizontal,
    UserRoundCheck,
    X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatter } from '@/lib/utils';
import applicants from '@/routes/applicants';
import type {
    Applicant,
    ApplicantApplication,
    ApplicantFilters,
    ApplicationStage,
    PaginatedApplicants,
} from '@/types/Applicant';

type ApplicantsIndexProps = {
    applicants: PaginatedApplicants;
    filters: ApplicantFilters;
};

const stages: { label: string; value: ApplicationStage | '' }[] = [
    { label: 'All', value: '' },
    { label: 'Applied', value: 'applied' },
    { label: 'Screening', value: 'screening' },
    { label: 'Interview', value: 'interview' },
    { label: 'Assessment', value: 'assessment' },
    { label: 'Offer', value: 'offer' },
    { label: 'Hired', value: 'hired' },
    { label: 'Rejected', value: 'rejected' },
];

const stageStyles: Record<string, string> = {
    applied:
        'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300',
    screening:
        'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300',
    interview:
        'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300',
    assessment:
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300',
    offer: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300',
    hired: 'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300',
    rejected:
        'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300',
};

function labelFromValue(value: string) {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string | null) {
    if (!value) {
        return 'Not set';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

function getInitials(applicant: Applicant) {
    return `${applicant.first_name[0] ?? ''}${applicant.last_name[0] ?? ''}`
        .toUpperCase()
        .trim();
}

function getLatestApplication(applications: ApplicantApplication[]) {
    return applications
        .filter((application) => application.applied_at)
        .sort(
            (first, second) =>
                new Date(second.applied_at ?? '').getTime() -
                new Date(first.applied_at ?? '').getTime(),
        )[0];
}

export default function Index({
    applicants: paginatedApplicants,
    filters,
}: ApplicantsIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [appliedFrom, setAppliedFrom] = useState(filters.applied_from ?? '');
    const [appliedUntil, setAppliedUntil] = useState(
        filters.applied_until ?? '',
    );
    const activeStage = filters.stage ?? '';

    const visibleSummary = useMemo(() => {
        const total = paginatedApplicants.meta.total;
        const from = paginatedApplicants.meta.from ?? 0;
        const to = paginatedApplicants.meta.to ?? 0;

        if (total === 0) {
            return 'No applicants found';
        }

        return `Showing ${formatter.format(from)}-${formatter.format(to)} of ${formatter.format(total)}`;
    }, [
        paginatedApplicants.meta.from,
        paginatedApplicants.meta.to,
        paginatedApplicants.meta.total,
    ]);

    const filterPayload = (stage = activeStage) => ({
        search: search || undefined,
        stage: stage || undefined,
        applied_from: appliedFrom || undefined,
        applied_until: appliedUntil || undefined,
    });

    const submitFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(applicants.index.url(), filterPayload(), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const updateStage = (stage: ApplicationStage | '') => {
        router.get(applicants.index.url(), filterPayload(stage), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setAppliedFrom('');
        setAppliedUntil('');

        router.get(
            applicants.index.url(),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const hasFilters = Boolean(
        filters.search ||
        filters.stage ||
        filters.applied_from ||
        filters.applied_until ||
        filters.job_opening_id,
    );

    return (
        <>
            <Head title="Applicants" />

            <div className="min-h-full bg-background">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden rounded-lg border bg-card"
                    >
                        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <FileUser className="size-3.5" />
                                    Applicant workspace
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        Review every candidate in your pipeline
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Search applicants, inspect their current
                                        roles, and narrow the list by hiring
                                        stage or application date.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild>
                                        <Link href={applicants.create()}>
                                            <Plus className="size-4" />
                                            Add Applicant
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={applicants.index()}>
                                            <SlidersHorizontal className="size-4" />
                                            Reset View
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/40 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total applicants
                                        </p>
                                        <p className="mt-2 text-4xl font-semibold">
                                            {formatter.format(
                                                paginatedApplicants.meta.total,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                                        <UserRoundCheck className="size-6" />
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Current page
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formatter.format(
                                                paginatedApplicants.meta
                                                    .current_page,
                                            )}{' '}
                                            of{' '}
                                            {formatter.format(
                                                paginatedApplicants.meta
                                                    .last_page,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Stage filter
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {activeStage
                                                ? labelFromValue(activeStage)
                                                : 'All stages'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <section className="rounded-lg border bg-card p-4 sm:p-5">
                        <div className="flex flex-col gap-4">
                            <form
                                onSubmit={submitFilters}
                                className="grid gap-3 lg:grid-cols-[minmax(18rem,1fr)_auto_auto_auto]"
                            >
                                <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search name or email"
                                        className="pl-9"
                                    />
                                </div>
                                <Input
                                    type="date"
                                    value={appliedFrom}
                                    onChange={(event) =>
                                        setAppliedFrom(event.target.value)
                                    }
                                    aria-label="Applied from"
                                />
                                <Input
                                    type="date"
                                    value={appliedUntil}
                                    onChange={(event) =>
                                        setAppliedUntil(event.target.value)
                                    }
                                    aria-label="Applied until"
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" variant="outline">
                                        <Filter className="size-4" />
                                        Filter
                                    </Button>
                                    {hasFilters && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={clearFilters}
                                        >
                                            <X className="size-4" />
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {stages.map((stage) => (
                                    <Button
                                        key={stage.value || 'all'}
                                        type="button"
                                        size="sm"
                                        variant={
                                            activeStage === stage.value
                                                ? 'default'
                                                : 'outline'
                                        }
                                        onClick={() => updateStage(stage.value)}
                                    >
                                        {stage.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-lg border bg-card">
                        <div className="flex flex-col gap-1 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold">Applicants</h2>
                                <p className="text-sm text-muted-foreground">
                                    {visibleSummary}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y">
                            {paginatedApplicants.data.map(
                                (applicant, index) => {
                                    const latestApplication =
                                        getLatestApplication(
                                            applicant.applications,
                                        ) ?? applicant.applications[0];
                                    const latestStage =
                                        latestApplication?.stage ?? null;
                                    const job =
                                        latestApplication?.job_opening ?? null;

                                    return (
                                        <motion.article
                                            key={applicant.id}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: index * 0.04,
                                                duration: 0.3,
                                            }}
                                            className="grid gap-5 p-5 lg:grid-cols-[1fr_auto]"
                                        >
                                            <div className="min-w-0 space-y-4">
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                                                        {getInitials(
                                                            applicant,
                                                        ) || 'A'}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="line-clamp-1 text-base font-semibold">
                                                                {
                                                                    applicant.full_name
                                                                }
                                                            </h3>
                                                            {latestStage && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        stageStyles[
                                                                            latestStage
                                                                        ]
                                                                    }
                                                                >
                                                                    {labelFromValue(
                                                                        latestStage,
                                                                    )}
                                                                </Badge>
                                                            )}
                                                            <Badge variant="secondary">
                                                                {formatter.format(
                                                                    applicant
                                                                        .applications
                                                                        .length,
                                                                )}{' '}
                                                                {applicant
                                                                    .applications
                                                                    .length ===
                                                                1
                                                                    ? 'application'
                                                                    : 'applications'}
                                                            </Badge>
                                                        </div>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {job
                                                                ? `${job.title} - ${job.department}`
                                                                : 'No role linked yet'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="size-4" />
                                                        <span className="line-clamp-1">
                                                            {applicant.email}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="size-4" />
                                                        <span className="line-clamp-1">
                                                            {applicant.phone ??
                                                                'No phone'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CalendarClock className="size-4" />
                                                        <span>
                                                            Applied{' '}
                                                            {formatDate(
                                                                latestApplication?.applied_at ??
                                                                    null,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={applicants.show(
                                                            applicant,
                                                        )}
                                                    >
                                                        <Eye className="size-4" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={applicants.edit(
                                                            applicant,
                                                        )}
                                                    >
                                                        <Edit className="size-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </div>
                                        </motion.article>
                                    );
                                },
                            )}

                            {paginatedApplicants.data.length === 0 && (
                                <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                                    <div className="rounded-md bg-muted p-3 text-muted-foreground">
                                        <FileText className="size-6" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">
                                        No applicants match this view
                                    </h3>
                                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                        Add a candidate manually or clear the
                                        filters to return to the full applicant
                                        pool.
                                    </p>
                                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                                        <Button asChild>
                                            <Link href={applicants.create()}>
                                                <Plus className="size-4" />
                                                Add Applicant
                                            </Link>
                                        </Button>
                                        {hasFilters && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={clearFilters}
                                            >
                                                <X className="size-4" />
                                                Clear Filters
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {paginatedApplicants.meta.links.length > 3 && (
                        <nav className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-muted-foreground">
                                {visibleSummary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {paginatedApplicants.meta.links.map((link) => (
                                    <Button
                                        key={`${link.label}-${link.url}`}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        asChild={Boolean(link.url)}
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                preserveScroll
                                                preserveState
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ) : (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </nav>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    stickyHeader: true,
    breadcrumbs: [
        {
            title: 'Applicants',
            href: applicants.index(),
        },
    ],
};
