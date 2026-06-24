import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    FileText,
    Mail,
    Phone,
    Send,
    Upload,
    UserRoundPlus,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import applicants from '@/routes/applicants';
import type {
    ApplicantForm,
    JobOpeningOption,
} from '@/types/Applicant/TCreate';

interface CreateApplicantProps {
    jobOpenings: JobOpeningOption[];
}

export default function Create({ jobOpenings }: CreateApplicantProps) {
    const { data, setData, post, processing, errors } = useForm<ApplicantForm>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        resume: null,
        cover_letter: '',
        job_opening_id: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(applicants.store.url(), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Create Applicant" />

            <div className="min-h-full bg-background">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
                    <motion.section
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden rounded-lg border bg-card"
                    >
                        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <UserRoundPlus className="size-3.5" />
                                    New Applicant
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        Add a candidate to your hiring pipeline
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Capture the candidate profile, attach a
                                        resume, and connect them to the role
                                        they are applying for.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild variant="outline">
                                        <Link href={applicants.index()}>
                                            <ArrowLeft className="size-4" />
                                            Back to Applicants
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/40 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-md bg-primary/10 p-3 text-primary">
                                        <FileText className="size-6" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">
                                            Applicant setup
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            Required fields are first name, last
                                            name, email, and job opening.
                                            Resume, phone, and cover letter can
                                            stay blank.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <form
                        onSubmit={submit}
                        className="grid gap-6 lg:grid-cols-[1fr_22rem]"
                    >
                        <motion.section
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.35 }}
                            className="rounded-lg border bg-card"
                        >
                            <div className="border-b p-5">
                                <h2 className="font-semibold">
                                    Candidate details
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    These details identify the person across
                                    applications.
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
                                            value={data.first_name}
                                            onChange={(event) =>
                                                setData(
                                                    'first_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Maria"
                                        />
                                        <InputError
                                            message={errors.first_name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(event) =>
                                                setData(
                                                    'last_name',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Santos"
                                        />
                                        <InputError
                                            message={errors.last_name}
                                        />
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
                                                value={data.email}
                                                onChange={(event) =>
                                                    setData(
                                                        'email',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="maria@example.com"
                                                className="pl-9"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
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
                                    <InputError message={errors.resume} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cover_letter">
                                        Cover letter
                                    </Label>
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
                                <h2 className="font-semibold">Application</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Choose the role this applicant is applying
                                    for.
                                </p>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="space-y-2">
                                    <Label htmlFor="job_opening_id">
                                        Job Opening
                                    </Label>
                                    <Select
                                        value={data.job_opening_id}
                                        onValueChange={(value) =>
                                            setData('job_opening_id', value)
                                        }
                                    >
                                        <SelectTrigger
                                            id="job_opening_id"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select open role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jobOpenings.map((jobOpening) => (
                                                <SelectItem
                                                    key={jobOpening.id}
                                                    value={String(
                                                        jobOpening.id,
                                                    )}
                                                >
                                                    {jobOpening.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.job_opening_id}
                                    />
                                </div>

                                <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                                    Saving this form creates the applicant and
                                    starts their first application at the
                                    applied stage.
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row lg:flex-col-reverse">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={applicants.index()}>
                                            <ArrowLeft className="size-4" />
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={
                                            processing ||
                                            jobOpenings.length === 0
                                        }
                                    >
                                        {processing ? (
                                            <Spinner className="size-4" />
                                        ) : data.resume ? (
                                            <Upload className="size-4" />
                                        ) : (
                                            <Send className="size-4" />
                                        )}
                                        Create Applicant
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

Create.layout = {
    stickyHeader: true,
    breadcrumbs: [
        {
            title: 'Applicants',
            href: applicants.index(),
        },
        {
            title: 'Create New Applicant',
            href: applicants.create(),
        },
    ],
};
