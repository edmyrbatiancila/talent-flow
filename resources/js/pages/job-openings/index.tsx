import { Head, Link, router } from '@inertiajs/react';
import {
    Archive,
    BriefcaseBusiness,
    CalendarClock,
    Edit,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { statuses, statusStyles } from '@/hooks/JobOpening/index/functions';
import { formatter, formatSalary, labelFromValue, formatDate } from '@/lib/utils';
import jobOpenings from '@/routes/job-openings';
import type {
    JobOpeningFilters,
    PaginatedJobOpenings,
} from '@/types/JobOpening';


type JobOpeningsIndexProps = {
    jobOpenings: PaginatedJobOpenings;
    filters: JobOpeningFilters;
};

export default function Index({
    jobOpenings: paginatedJobs,
    filters,
}: JobOpeningsIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const activeStatus = filters.status ?? '';

    const visibleSummary = useMemo(() => {
        const total = paginatedJobs.meta.total;
        const from = paginatedJobs.meta.from ?? 0;
        const to = paginatedJobs.meta.to ?? 0;

        if (total === 0) {
            return 'No job openings found';
        }

        return `Showing ${formatter.format(from)}-${formatter.format(to)} of ${formatter.format(total)}`;
    }, [
        paginatedJobs.meta.from,
        paginatedJobs.meta.to,
        paginatedJobs.meta.total,
    ]);

    const submitFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            jobOpenings.index.url(),
            {
                search: search || undefined,
                status: activeStatus || undefined,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const updateStatus = (status: string) => {
        router.get(
            jobOpenings.index.url(),
            {
                search: search || undefined,
                status: status || undefined,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const clearFilters = () => {
        setSearch('');

        router.get(
            jobOpenings.index.url(),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const hasFilters = Boolean(filters.search || filters.status);

    return (
        <>
            <Head title="Job Openings" />

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
                                    <BriefcaseBusiness className="size-3.5" />
                                    Job opening workspace
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        Manage every role in your hiring plan
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Review draft, open, closed, and archived
                                        roles before applicants move through the
                                        pipeline.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild>
                                        <Link href={jobOpenings.create()}>
                                            <Plus className="size-4" />
                                            Create Job
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href={jobOpenings.index()}>
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
                                            Total openings
                                        </p>
                                        <p className="mt-2 text-4xl font-semibold">
                                            {formatter.format(
                                                paginatedJobs.meta.total,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                                        <Archive className="size-6" />
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Current page
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formatter.format(
                                                paginatedJobs.meta.current_page,
                                            )}{' '}
                                            of{' '}
                                            {formatter.format(
                                                paginatedJobs.meta.last_page,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Status filter
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {activeStatus
                                                ? labelFromValue(activeStatus)
                                                : 'All roles'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <section className="rounded-lg border bg-card p-4 sm:p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <form
                                onSubmit={submitFilters}
                                className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl"
                            >
                                <div className="relative flex-1">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search title, department, or location"
                                        className="pl-9"
                                    />
                                </div>
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
                            </form>

                            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                                {statuses.map((status) => (
                                    <Button
                                        key={status.value || 'all'}
                                        type="button"
                                        size="sm"
                                        variant={
                                            activeStatus === status.value
                                                ? 'default'
                                                : 'outline'
                                        }
                                        onClick={() =>
                                            updateStatus(status.value)
                                        }
                                    >
                                        {status.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-lg border bg-card">
                        <div className="flex flex-col gap-1 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-semibold">Job openings</h2>
                                <p className="text-sm text-muted-foreground">
                                    {visibleSummary}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y">
                            {paginatedJobs.data.map((job, index) => (
                                <motion.article
                                    key={job.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.04,
                                        duration: 0.3,
                                    }}
                                    className="grid gap-5 p-5 lg:grid-cols-[1fr_auto]"
                                >
                                    <div className="min-w-0 space-y-4">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="line-clamp-1 text-base font-semibold">
                                                        {job.title}
                                                    </h3>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            statusStyles[
                                                                job.status
                                                            ] ?? undefined
                                                        }
                                                    >
                                                        {labelFromValue(
                                                            job.status,
                                                        )}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {job.department} •{' '}
                                                    {labelFromValue(
                                                        job.employment_type,
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="line-clamp-2 max-w-4xl text-sm leading-6 text-muted-foreground">
                                            {job.description}
                                        </p>

                                        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="size-4" />
                                                <span className="line-clamp-1">
                                                    {job.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BriefcaseBusiness className="size-4" />
                                                <span>
                                                    {formatSalary(
                                                        job.salary_min,
                                                        job.salary_max,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CalendarClock className="size-4" />
                                                <span>
                                                    Created{' '}
                                                    {formatDate(job.created_at)}
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
                                            <Link href={jobOpenings.show(job)}>
                                                <Eye className="size-4" />
                                                View
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={jobOpenings.edit(job)}>
                                                <Edit className="size-4" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.article>
                            ))}

                            {paginatedJobs.data.length === 0 && (
                                <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                                    <div className="rounded-md bg-muted p-3 text-muted-foreground">
                                        <BriefcaseBusiness className="size-6" />
                                    </div>
                                    <h3 className="mt-4 font-semibold">
                                        No job openings match this view
                                    </h3>
                                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                        Create a new role or clear the filters
                                        to get back to the full hiring plan.
                                    </p>
                                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                                        <Button asChild>
                                            <Link href={jobOpenings.create()}>
                                                <Plus className="size-4" />
                                                Create Job
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

                    {paginatedJobs.meta.links.length > 3 && (
                        <nav className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-muted-foreground">
                                {visibleSummary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {paginatedJobs.meta.links.map((link) => (
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
            title: 'Job Openings',
            href: jobOpenings.index(),
        },
    ],
};
