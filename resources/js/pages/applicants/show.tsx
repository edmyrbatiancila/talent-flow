import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, BriefcaseBusiness, CalendarClock, CheckCircle, Edit, FileText, Mail, Phone, UserRound, UserRoundCheck } from "lucide-react";
import { motion } from 'motion/react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { stages } from "@/hooks/applicants/objects";
import { stageStyles } from "@/hooks/JobOpening/show/functions";
import { getApplicantInitials, getLatestApplication } from "@/lib/applicant/showFunctions";
import { formatDate, formatter, labelFromValue } from "@/lib/utils";
import applicants from "@/routes/applicants";
import applications from "@/routes/applications";
import jobOpenings from "@/routes/job-openings";
import storage from "@/routes/storage";
import type { Applicant, ApplicantApplication } from "@/types/Applicant";
import type { ApplicationStage } from "@/types/Application";

interface ShowApplicantProps {
    applicant: {
        data: Applicant;
    }
}

export default function Show({ applicant: resource }: ShowApplicantProps) {
    const applicant = resource.data;
    const applicantInitials = getApplicantInitials(applicant) || 'A';
    const latestApplication = 
        getLatestApplication(applicant.applications) ?? applicant.applications[0];

    const updateStage = (
        application: ApplicantApplication,
        stage: ApplicationStage
    ) => {
        router.patch(
            applications.stage.update.url(application),
            { stage },
            {
                preserveScroll: true
            }
        );
    };

    return (
        <>
            <Head title={applicant.full_name} />

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
                                        <UserRound className="size-3.5" />
                                        Applicant profile
                                    </div>

                                    {latestApplication?.stage && (
                                        <Badge
                                            variant="outline"
                                            className={
                                                stageStyles[
                                                    latestApplication.stage
                                                ]
                                            }
                                        >
                                            {labelFromValue(latestApplication.stage)}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl font-semibold text-primary">
                                        {applicantInitials}
                                    </div>

                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                            {applicant.full_name}
                                        </h1>

                                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                            Candidate profile, application history, resume, and hiring stage details.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={applicants.index()}>
                                            <ArrowLeft className="size-4" />
                                            Back to Applicants
                                        </Link>
                                    </Button>

                                    <Button asChild>
                                        <Link href={applicants.edit(applicant)}>
                                            <Edit className="size-4" />
                                            Edit Applicant
                                        </Link>
                                    </Button>
                                </div>

                                <div className="rounded-lg border btg-muted/40 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Total applications
                                            </p>

                                            <p className="mt-2 text-4xl font-semibold">
                                                {formatter.format(
                                                    applicant.applications.length
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-md bg-primary/10 p-3 text-primary">
                                            <UserRoundCheck className="size-6" />
                                        </div>
                                    </div>

                                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                                        Applicant record created on{' '}
                                        {formatDate(applicant.created_at)}.
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
                                transition={{ delay: 0.08, duration: 0.35 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Cover Letter</CardTitle>
                                        <CardDescription>
                                            Candidate notes and submitted cover letter.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        {applicant.cover_letter ? (
                                            <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                                                {applicant.cover_letter}
                                            </p>
                                        ) : (
                                            <div className="rounded-lg border border-dashed px-5 py-10 text-center">
                                                <FileText className="mx-auto size-6 text-muted-foreground" />
                                                <h3 className="mt-4 font-semibold">No cover letter</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    This applicant does not have a cover letter attached.
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.14, duration: 0.35 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Applications</CardTitle>
                                        <CardDescription>
                                            Roles connected to this applicant
                                            and their current hiring stage.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        {applicant.applications.length > 0 ? (
                                            <div className="divide-y rounded-lg border">
                                                {applicant.applications.map(
                                                    (application) => {
                                                        const jobOpening = application.job_opening;

                                                        return (
                                                            <article
                                                                key={
                                                                    application.id
                                                                }
                                                                className="grid gap-4 p-4 lg:grid-cols-[1fr_14rem]"
                                                            >
                                                                <div className="min-w-0 space-y-3">
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <h3 className="font-semibold">
                                                                            {jobOpening
                                                                                ? jobOpening.title
                                                                                : 'Unassigned role'
                                                                            }
                                                                        </h3>

                                                                        {application.stage && (
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    stageStyles[
                                                                                        application.stage
                                                                                    ]
                                                                                }
                                                                            >
                                                                                {labelFromValue(
                                                                                    application.stage,
                                                                                )}
                                                                            </Badge>
                                                                        )}
                                                                    </div>

                                                                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                                                                        <span className="flex items-center gap-2">
                                                                            <BriefcaseBusiness className="size-4" />
                                                                            {jobOpening
                                                                                ? jobOpening.department
                                                                                : 'No department'
                                                                            }
                                                                        </span>

                                                                        <span className="flex items-center gap-2">
                                                                            <CalendarClock className="size-4" />
                                                                            Applied{' '}
                                                                            {formatDate(application.applied_at)}
                                                                        </span>

                                                                        <span className="flex items-center gap-2">
                                                                            <CheckCircle className="size-4" />
                                                                            {application.hired_at
                                                                                ? `Hired ${formatDate(application.hired_at)}`
                                                                                : application.rejected_at
                                                                                ? `Rejected ${formatDate(application.rejected_at)}`
                                                                                : 'Active pipeline'
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    {jobOpening && (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            asChild
                                                                        >
                                                                            <Link
                                                                                href={jobOpenings.show(
                                                                                    jobOpening,
                                                                                )}
                                                                            >
                                                                                View Job
                                                                            </Link>
                                                                        </Button>
                                                                    )}
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <p className="text-sm font-medium">
                                                                        Stage
                                                                    </p>

                                                                    <Select
                                                                        value={
                                                                            application.stage ??
                                                                            undefined
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            updateStage(
                                                                                application,
                                                                                value as ApplicationStage,
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select stage" />
                                                                        </SelectTrigger>

                                                                        <SelectContent>
                                                                            {stages.map(
                                                                                (stage) => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            stage.value
                                                                                        }
                                                                                        value={
                                                                                            stage.value
                                                                                        }
                                                                                    >
                                                                                        {stage.label}
                                                                                    </SelectItem>
                                                                                )
                                                                            )}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </article>
                                                        );
                                                    }
                                                )}

                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-5 py-12 text-center">
                                                <BriefcaseBusiness className="size-6 text-muted-foreground" />

                                                <h3 className="mt-4 font-semibold">
                                                    No application yet
                                                </h3>

                                                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                                    Applications connected to
                                                    this applicant will appear
                                                    here.
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
                            transition={{ delay: 0.1, duration: 0.35 }}
                            className="h-fit"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Applicant information</CardTitle>
                                    <CardDescription>
                                        Contact details and attached resume.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5 text-sm">
                                    <div className="flex items-start gap-3">
                                        <Mail className="mt-0.5 size-4 text-muted-foreground" />
                                        <div className="min-w-0">
                                            <p className="text-muted-foreground">
                                                Email
                                            </p>
                                            <p className="mt-1 break-all font-medium">
                                                {applicant.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Phone
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {applicant.phone ?? 'No phone'}
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <FileText className="mt-0.5 size-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-muted-foreground">
                                                    Resume
                                                </p>
                                                <p className="mt-1 font-medium">
                                                    {applicant.resume_path
                                                        ? 'Resume attached'
                                                        : 'No resume attached'}
                                                </p>
                                            </div>
                                        </div>

                                        {applicant.resume_path && (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                            >
                                                <a
                                                    href={storage.local.url(
                                                        applicant.resume_path,
                                                    )}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <FileText className="size-4" />
                                                    View Resume
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="flex items-start gap-3">
                                        <CalendarClock className="mt-0.5 size-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">
                                                Created
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {formatDate(
                                                    applicant.created_at,
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
            title: 'Applicants',
            href: applicants.index(),
        },
        {
            title: 'Applicant Details',
            href: '#',
        },
    ],
};