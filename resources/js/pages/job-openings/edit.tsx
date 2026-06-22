import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    BriefcaseBusiness,
    Building2,
    FilePenLine,
    MapPin,
    PhilippinePeso,
    RotateCcw,
    Save,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { employmentTypes, statuses } from '@/hooks/JobOpening/dataArray';
import jobOpenings from '@/routes/job-openings';
import type { JobOpening } from '@/types/JobOpening';
import type { JobOpeningForm } from '@/types/JobOpening/TCreate';

type EditJobOpeningProps = {
    jobOpening: {
        data: JobOpening;
    };
};

export default function Edit({ jobOpening: resourse }: EditJobOpeningProps) {
    const jobOpening = resourse.data;
    
    const { data, setData, put, processing, errors, isDirty, reset } =
        useForm<JobOpeningForm>({
            title: jobOpening.title,
            department: jobOpening.department,
            employment_type: jobOpening.employment_type,
            location: jobOpening.location ?? '',
            salary_min: jobOpening.salary_min?.toString() ?? '',
            salary_max: jobOpening.salary_max?.toString() ?? '',
            description: jobOpening.description,
            status: jobOpening.status,
        });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(jobOpenings.update.url(jobOpening), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Edit ${jobOpening.title}`} />

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
                                        Edit Job Opening
                                    </div>

                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                            Update {jobOpening.title}
                                        </h1>

                                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                            Keep the role information accurate
                                            so recruiters and applicants have
                                            the latest hiring details.
                                        </p>
                                    </div>

                                    <Button asChild variant="outline">
                                        <Link href={jobOpenings.index()}>
                                            <ArrowLeft className="size-4" />
                                            Back to Jobs
                                        </Link>
                                    </Button>
                                </div>

                                <div className="rounded-lg border bg-muted/40 p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-md bg-primary/10 p-3 text-primary">
                                            <BriefcaseBusiness className="size-6" />
                                        </div>

                                        <div>
                                            <h2 className="font-semibold">
                                                Editing an existing role
                                            </h2>

                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                The current values are loaded
                                                from the job-opening resource.
                                                Only save when your changes are
                                                ready.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.section>

                    <form
                        onSubmit={submit}
                        className="grid gap-6 lg:grid-cols-[1fr_22rem]"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.35 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job Details</CardTitle>
                                    <CardDescription>
                                        Update the information displayed
                                        throughout the recruiter workspace.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">
                                                Job title
                                            </Label>

                                            <Input
                                                id="title"
                                                value={data.title}
                                                onChange={(event) =>
                                                    setData(
                                                        'title',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Senior Product Designer"
                                                autoFocus
                                            />

                                            <InputError
                                                message={errors.title}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="department">
                                                Department
                                            </Label>

                                            <div className="relative">
                                                <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                                <Input
                                                    id="department"
                                                    value={data.department}
                                                    onChange={(event) =>
                                                        setData(
                                                            'department',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Product"
                                                    className="pl-9"
                                                />
                                            </div>

                                            <InputError
                                                message={errors.department}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="employment_type">
                                                Employment type
                                            </Label>

                                            <Select
                                                value={data.employment_type}
                                                onValueChange={(value) =>
                                                    setData(
                                                        'employment_type',
                                                        value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    id="employment_type"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select employment type" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {employmentTypes.map(
                                                        (type) => (
                                                            <SelectItem
                                                                key={type.value}
                                                                value={
                                                                    type.value
                                                                }
                                                            >
                                                                {type.label}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            <InputError
                                                message={errors.employment_type}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location">
                                                Location
                                            </Label>

                                            <div className="relative">
                                                <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                                <Input
                                                    id="location"
                                                    value={data.location}
                                                    onChange={(event) =>
                                                        setData(
                                                            'location',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Remote, Manila, New York"
                                                    className="pl-9"
                                                />
                                            </div>

                                            <InputError
                                                message={errors.location}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="salary_min">
                                                Minimum salary
                                            </Label>

                                            <div className="relative">
                                                <PhilippinePeso className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                                <Input
                                                    id="salary_min"
                                                    type="number"
                                                    min="0"
                                                    inputMode="numeric"
                                                    value={data.salary_min}
                                                    onChange={(event) =>
                                                        setData(
                                                            'salary_min',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="60000"
                                                    className="pl-9"
                                                />
                                            </div>

                                            <InputError
                                                message={errors.salary_min}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="salary_max">
                                                Maximum salary
                                            </Label>

                                            <div className="relative">
                                                <PhilippinePeso className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                                                <Input
                                                    id="salary_max"
                                                    type="number"
                                                    min="0"
                                                    inputMode="numeric"
                                                    value={data.salary_max}
                                                    onChange={(event) =>
                                                        setData(
                                                            'salary_max',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="90000"
                                                    className="pl-9"
                                                />
                                            </div>

                                            <InputError
                                                message={errors.salary_max}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Description
                                            </Label>

                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(event) =>
                                                    setData(
                                                        'description',
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Describe the role, responsibilities, requirements, and team context."
                                                rows={9}
                                                className="flex min-h-40 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                                            />

                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.aside
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14, duration: 0.35 }}
                            className="h-fit"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Status and actions</CardTitle>
                                    <CardDescription>
                                        Control the role's visibility in the
                                        hiring workflow.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>

                                        <Select
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData('status', value)
                                            }
                                        >
                                            <SelectTrigger
                                                id="status"
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem
                                                        key={status.value}
                                                        value={status.value}
                                                    >
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <InputError message={errors.status} />
                                    </div>

                                    <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                                        Draft roles are still being prepared.
                                        Open roles are actively hiring, while
                                        closed roles no longer accept
                                        applicants.
                                    </div>

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
                                            ) : (
                                                <Save className="size-4" />
                                            )}
                                            Save Changes
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing || !isDirty}
                                            onClick={() => reset()}
                                        >
                                            <RotateCcw className="size-4" />
                                            Reset Changes
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            asChild
                                        >
                                            <Link href={jobOpenings.index()}>
                                                <ArrowLeft className="size-4" />
                                                Cancel
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
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
            title: 'Job Openings',
            href: jobOpenings.index(),
        },
        {
            title: 'Edit Job Opening',
            href: '#',
        },
    ],
};
