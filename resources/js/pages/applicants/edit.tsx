import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, FilePenLine, FileText, Mail, Phone, Save, Upload, UserRoundPen } from "lucide-react";
import { motion } from 'motion/react';
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import applicants from "@/routes/applicants";
import storage from "@/routes/storage";
import type { Applicant } from "@/types/Applicant";
import type { ApplicantForm } from "@/types/Applicant/TCreate";



interface EditApplicantProps {
    applicant: {
        data: Applicant;
    }
}

type EditApplicantForm = Omit<ApplicantForm, 'job_opening_id'> & {
    _method: 'put'
}

const Edit = ({ applicant: resource }: EditApplicantProps) => {
    const applicant = resource.data;

    const { data, setData, post, processing, errors, isDirty } = useForm<EditApplicantForm>({
        first_name : applicant.first_name,
        last_name: applicant.last_name,
        email: applicant.email,
        phone: applicant.phone ?? '',
        resume: null,
        cover_letter: applicant.cover_letter ?? '',
        _method: 'put'
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(applicants.update.url(applicant), {
            preserveScroll: true,
            forceFormData: true
        });
    };

    return (
        <>
            <Head title={ `Edit ${applicant.full_name}` } />

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
                                    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                        <FilePenLine className="size-3.5" />
                                        Edit Applicant
                                    </div>

                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Update { applicant.full_name }</h1>

                                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                            Keep candidate contact details, resume,
                                        and notes accurate for the hiring team.
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button asChild variant="outline">
                                            <Link href={ applicants.index() }>
                                                <ArrowLeft className="size-4" />
                                                Back to Applicants
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                <div className="rounded-lg border bg-muted/40 p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-md bg-primary/10 p-3 text-primary">
                                            <UserRoundPen className="size-6" />
                                        </div>

                                        <div>
                                            <h2 className="font-semibold">
                                                Editing candidate profile
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                Uploading a new resume replaces the
                                            stored resume path after saving.
                                            Leave the file input empty to keep
                                            the current resume.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <form
                        onSubmit={ submit }
                        className="grid gap-6 lg:grid-cols-[1fr_22rem]"
                    >
                        <motion.section
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.35 }}
                            className="rounded-lg border bg-card"
                        >
                            <div className="border-b p-5">
                                <h2 className="font-semibold">Candidate details</h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Update the candidate information used across the applicant workspace.
                                </p>
                            </div>

                            <div className="grid gap-5 p-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">
                                            First Name
                                        </Label>

                                        <Input 
                                            id="first_name"
                                            value={ data.first_name }
                                            onChange={ (event) => setData('first_name', event.target.value) }
                                            placeholder="Maria"
                                            autoFocus
                                        />

                                        <InputError message={ errors.first_name } />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Last Name</Label>

                                        <Input 
                                            id="last_name"
                                            value={ data.last_name }
                                            onChange={ (event) => setData('last_name', event.target.value) }
                                            placeholder="Santos"
                                        />

                                        <InputError message={ errors.last_name } />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>

                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input 
                                                id="email"
                                                type="email"
                                                value={ data.email }
                                                onChange={ (event) => setData('email', event.target.value) }
                                                placeholder="maria@example.com"
                                                className="pl-9"
                                            />
                                        </div>

                                        <InputError message={ errors.email } />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>

                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                            <Input 
                                                id="phone"
                                                value={data.phone}
                                                onChange={(event) =>
                                                    setData(
                                                        'phone',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="+63 900 000 0000"
                                                className="pl-9"
                                            />
                                        </div>

                                        <InputError message={errors.phone} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resume">Resume</Label>

                                    <Input 
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(event) =>
                                            setData(
                                                'resume',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />

                                    <InputError message={ errors.resume } />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover_letter">Cover letter</Label>

                                    <textarea 
                                        id="cover_letter"
                                        value={data.cover_letter}
                                        onChange={(event) =>
                                            setData(
                                                'cover_letter',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Add a short note, candidate summary, or cover letter."
                                        rows={9}
                                        className="flex min-h-40 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    />

                                    <InputError message={errors.cover_letter} />
                                </div>
                            </div>
                        </motion.section>

                        <motion.aside
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14, duration: 0.35 }}
                            className="h-fit rounded-lg border bg-card"
                        >
                            <div className="border-b p-5">
                                <h2 className="font-semibold">Resume and actions</h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Save only when the candidate profile is
                                    ready.
                                </p>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                                    {applicant.resume_path ? (
                                        <div className="space-y-3">
                                            <p>
                                                A resume is currently attached to this applicant
                                            </p>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a 
                                                    href={ storage.local.url(applicant.resume_path) }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <FileText className="size-4" />
                                                    View Current Resume
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <p>
                                            No resume is currently attached.
                                            Upload one before saving if you want
                                            to add it now.
                                        </p>
                                    )}
                                </div>

                                {data.resume && (
                                    <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                                        <span className="font-medium text-foreground">
                                            New resume selected:
                                        </span>{ ' ' }
                                        { data.resume.name }
                                    </div>
                                )}

                                {isDirty && (
                                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                        You have unsaved changes.
                                    </p>
                                )}

                                <div className="grid gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing || !isDirty}
                                    >
                                        {processing ? (
                                            <Spinner className="size-4" />
                                        ) : data.resume ? (
                                            <Upload className="size-4" />
                                        ) : (
                                            <Save className="size-4" />
                                        )}
                                        Save Changes
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        asChild
                                    >
                                        <Link href={applicants.index()}>
                                            <ArrowLeft className="size-4" />
                                            Cancel
                                        </Link>
                                    </Button>

                                </div>
                            </div>
                        </motion.aside>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    stickyHeader: true,
    breadcrumbs: [
        {
            title: 'Applicants',
            href: applicants.index(),
        },
        {
            title: 'Edit Applicant',
            href: '#',
        },
    ],
};

export default Edit;