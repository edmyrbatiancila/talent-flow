import { Head, Link } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    FileUser,
    Sparkles,
    TrendingUp,
    UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { statCards } from '@/hooks/dashboard/statCards';
import { formatter } from '@/lib/utils';
import { dashboard } from '@/routes';
import applicants from '@/routes/applicants';
import jobOpenings from '@/routes/job-openings';
import type { DashboardProps } from '@/types/Dashboard';

export default function Dashboard({
    stats,
    pipeline,
    recentJobOpenings,
    recentApplications,
}: DashboardProps) {
    const maxPipelineTotal = Math.max(...pipeline.map((item) => item.total), 1);
    const activeApplications =
        stats.applications - stats.hired - stats.rejected;

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-full bg-background">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="overflow-hidden rounded-lg border bg-card"
                    >
                        <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.6fr] lg:p-8">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <Sparkles className="size-3.5" />
                                    TalentFlow recruiter workspace
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        Hiring command center
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Track your job openings, applicant
                                        volume, and candidate movement across
                                        the hiring pipeline.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={jobOpenings.create()}
                                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                                    >
                                        <BriefcaseBusiness className="size-4" />
                                        Create Job
                                    </Link>

                                    <Link
                                        href={applicants.create()}
                                        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                                    >
                                        <FileUser className="size-4" />
                                        Add Candidate Manually
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/40 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Active applications
                                        </p>
                                        <p className="mt-2 text-4xl font-semibold">
                                            {formatter.format(
                                                activeApplications,
                                            )}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                                        <TrendingUp className="size-6" />
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Hired
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formatter.format(stats.hired)}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-background p-3">
                                        <p className="text-muted-foreground">
                                            Rejected
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {formatter.format(stats.rejected)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((card, index) => (
                            <motion.div
                                key={card.key}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.06,
                                    duration: 0.35,
                                }}
                                className="rounded-lg border bg-card p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`rounded-md p-2 ${card.tone}`}
                                    >
                                        <card.icon className="size-5" />
                                    </div>
                                </div>

                                <p className="mt-5 text-sm text-muted-foreground">
                                    {card.label}
                                </p>
                                <p className="mt-1 text-3xl font-semibold">
                                    {formatter.format(stats[card.key])}
                                </p>
                            </motion.div>
                        ))}
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-lg border bg-card p-5">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold">Pipeline</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Applications by current hiring stage
                                    </p>
                                </div>
                                <UserCheck className="size-5 text-muted-foreground" />
                            </div>

                            <div className="space-y-4">
                                {pipeline.map((item) => (
                                    <div key={item.stage}>
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {formatter.format(item.total)}
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${(item.total / maxPipelineTotal) * 100}%`,
                                                }}
                                                transition={{ duration: 0.55 }}
                                                className="h-full rounded-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-5">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold">
                                        Recent applications
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Latest applicants across your roles
                                    </p>
                                </div>
                                <Link
                                    href={applicants.index()}
                                    className="text-sm font-medium text-primary"
                                >
                                    View all
                                </Link>
                            </div>

                            <div className="divide-y">
                                {recentApplications.map((application) => (
                                    <div
                                        key={application.id}
                                        className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto]"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {application.applicant}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {application.job}
                                            </p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-sm font-medium">
                                                {application.stage}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {application.applied_at ??
                                                    'Recently applied'}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {recentApplications.length === 0 && (
                                    <p className="py-8 text-center text-sm text-muted-foreground">
                                        No applications yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-lg border bg-card p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold">
                                    Recent job openings
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Roles you created most recently
                                </p>
                            </div>
                            <Link
                                href={jobOpenings.index()}
                                className="text-sm font-medium text-primary"
                            >
                                View jobs
                            </Link>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                            {recentJobOpenings.map((job) => (
                                <div
                                    key={job.id}
                                    className="rounded-lg border p-4"
                                >
                                    <p className="line-clamp-1 font-medium">
                                        {job.title}
                                    </p>
                                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                                        {job.department}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground capitalize">
                                            {job.status}
                                        </span>
                                        <span className="font-medium">
                                            {job.applications_count} applicants
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    stickyHeader: true,
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
