import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, BriefcaseBusiness, Building2, CalendarClock, Edit, Mail, MapPin, PhilippinePeso, Phone, UserRound, Users } from "lucide-react";
import { motion } from 'motion/react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { stageStyles, statusStyles } from "@/hooks/JobOpening/show/functions";
import { formatDate, formatSalary, formatter, getInitials, labelFromValue } from "@/lib/utils";
import jobOpenings from "@/routes/job-openings";
import type { JobOpeningApplication } from "@/types/Application";
import type { JobOpening } from "@/types/JobOpening";


type ShowJobOpeningProps = {
    jobOpening: {
        data: JobOpening & {
            applications: JobOpeningApplication[];
        };
    };
};

export default function Show({ jobOpening: resource }: ShowJobOpeningProps) {
    const jobOpening = resource.data;
    const applications = jobOpening.applications;
    const location = jobOpening.location || 'Location not specified';

    return (
        <>
            <Head title={ jobOpening.title } />

            <div className="min-h-full bg-background">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card className="gap-0 overflow-hidden py-0">
                            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                            <BriefcaseBusiness className="size-3.5" />
                                            Job opening details
                                        </div>

                                        <Badge
                                            variant="outline"
                                            className={
                                                statusStyles[
                                                    jobOpening.status
                                                ]
                                            }
                                        >
                                            {labelFromValue(jobOpening.status)}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                            {jobOpening.title}
                                        </h1>

                                        <p className="text-sm text-muted-foreground">
                                            {jobOpening.department} ·{' '}
                                            {labelFromValue(
                                                jobOpening.employment_type,
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button variant="outline" asChild>
                                            <Link href={jobOpenings.index()}>
                                                <ArrowLeft className="size-4" />
                                                Back to Jobs
                                            </Link>
                                        </Button>

                                        <Button asChild>
                                            <Link
                                                href={jobOpenings.edit(
                                                    jobOpening,
                                                )}
                                            >
                                                <Edit className="size-4" />
                                                Edit Job
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="rounded-lg border bg-muted/40 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Total applications
                                            </p>

                                            <p className="mt-2 text-4xl font-semibold">
                                                {formatter.format(
                                                    applications.length,
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-md bg-primary/10 p-3 text-primary">
                                            <Users className="size-6" />
                                        </div>
                                    </div>

                                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                                        Candidates currently connected to this
                                        role and their latest hiring stage.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
                        <div className="space-y-6">
                            <motion.section
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.08,
                                    duration: 0.35,
                                }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Role description</CardTitle>
                                        <CardDescription>
                                            Responsibilities, requirements, and
                                            additional context for this role.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                                            {jobOpening.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.14,
                                    duration: 0.35,
                                }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Applications</CardTitle>
                                        <CardDescription>
                                            Candidates currently associated with
                                            this job opening.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        {applications.length > 0 ? (
                                            <div className="divide-y rounded-lg border">
                                                {applications.map(
                                                    (application) => {
                                                        const applicant =
                                                            application.applicant;

                                                        return (
                                                            <article
                                                                key={
                                                                    application.id
                                                                }
                                                                className="grid gap-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                                                            >
                                                                <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                                                                    {getInitials(
                                                                        application,
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="font-medium">
                                                                        {applicant?.full_name ??
                                                                            'Unknown applicant'}
                                                                    </p>

                                                                    <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-4">
                                                                        <span className="flex items-center gap-2">
                                                                            <Mail className="size-4" />
                                                                            {applicant?.email ??
                                                                                'No email'}
                                                                        </span>

                                                                        <span className="flex items-center gap-2">
                                                                            <Phone className="size-4" />
                                                                            {applicant?.phone ??
                                                                                'No phone'}
                                                                        </span>

                                                                        <span className="flex items-center gap-2">
                                                                            <CalendarClock className="size-4" />
                                                                            Applied{' '}
                                                                            {formatDate(
                                                                                application.applied_at,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {application.stage && (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={
                                                                            stageStyles[
                                                                                application
                                                                                    .stage
                                                                            ]
                                                                        }
                                                                    >
                                                                        {labelFromValue(
                                                                            application.stage,
                                                                        )}
                                                                    </Badge>
                                                                )}
                                                            </article>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-5 py-12 text-center">
                                                <div className="rounded-md bg-muted p-3 text-muted-foreground">
                                                    <UserRound className="size-6" />
                                                </div>

                                                <h3 className="mt-4 font-semibold">
                                                    No applications yet
                                                </h3>

                                                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                                    Candidates connected to this
                                                    role will appear here.
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.section>
                        </div>

                        <motion.aside
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.1,
                                duration: 0.35,
                            }}
                            className="h-fit"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job information</CardTitle>
                                    <CardDescription>
                                        Important details about this opening.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5 text-sm">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Department
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {jobOpening.department}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Location
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <PhilippinePeso className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Salary
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {formatSalary(
                                                    jobOpening.salary_min,
                                                    jobOpening.salary_max,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <UserRound className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Created by
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {jobOpening.user?.name ??
                                                    'Unknown recruiter'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CalendarClock className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Created
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {formatDate(
                                                    jobOpening.created_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.aside>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    stickyHeader: true,
    breadcrumbs: [
        {
            title: 'Job Openings',
            href: jobOpenings.index(),
        },
        {
            title: 'Job Details',
            href: '#',
        },
    ],
};