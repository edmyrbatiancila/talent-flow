import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, BriefcaseBusiness, Building2, FileText, LoaderCircle, MapPin, PhilippinePeso, Save, Send } from "lucide-react";
import { motion } from 'motion/react'
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldError } from "@/hooks/FieldError";
import { employmentTypes, statuses } from "@/hooks/JobOpening/dataArray";
import jobOpenings from "@/routes/job-openings";
import type { JobOpeningForm } from "@/types/JobOpening/TCreate";



export default function Create() {
    const { data, setData, post, processing, errors } = useForm<JobOpeningForm>({
        title: '',
        department: '',
        employment_type: 'full_time',
        location: '',
        salary_min: '',
        salary_max: '',
        description: '',
        status: 'draft'
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(jobOpenings.store.url(), {
            preserveScroll: true
        });
    };

    return (
        <>
            <Head title="Create Job Opening" />

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
                                    <BriefcaseBusiness className="size-3.5" />
                                    New job opening
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                        Create a role for your hiring pipeline
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Add the core role details recruiters and applicants need before moving candidates through the workflow.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button asChild variant="outline">
                                        <Link href={jobOpenings.index()}>
                                            <ArrowLeft className="size-4" />
                                            Back to Jobs
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
                                        <h2 className="font-semibold">Role setup</h2>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            Required fields are title, department, employment type, description, and status. Location and salary range can stay blank.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_22rem]">
                        <motion.section
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.35 }}
                            className="rounded-lg border bg-card"
                        >
                            <div className="border-b p-5">
                                <h2 className="font-semibold">Job details</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    These details appear throughout the recruiter workspace.
                                </p>
                            </div>

                            <div className="grid gap-5 p-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Job title
                                        </Label>
                                        <Input 
                                            id="title"
                                            value={ data.title }
                                            onChange={ (event) => setData('title', event.target.value) }
                                            placeholder="Senior Product Designer"
                                        />
                                        <InputError message={ errors.title } />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <div className="relative">
                                            <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input 
                                                id="department"
                                                value={ data.department }
                                                onChange={ (event) => setData('department', event.target.value) }
                                                placeholder="Product"
                                                className="pl-9"
                                            />
                                        </div>
                                        <InputError message={ errors.department } />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="employment_type">Employment type</Label>
                                        <Select
                                            value={ data.employment_type }
                                            onValueChange={ (value) => setData('employment_type', value) }
                                        >
                                            <SelectTrigger id="employment_type" className="w-full">
                                                <SelectValue placeholder="Select employment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {employmentTypes.map((type) => (
                                                    <SelectItem key={ type.value } value={ type.value }>
                                                        { type.label }
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={ errors.employment_type } />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="location"
                                                value={data.location}
                                                onChange={(event) =>
                                                    setData('location', event.target.value)
                                                }
                                                placeholder="Remote, Manila, New York"
                                                className="pl-9"
                                            />
                                        </div>
                                        <FieldError message={errors.location} />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="salary_min">Minumum salary</Label>
                                        <div className="relative">
                                            <PhilippinePeso className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="salary_min"
                                                type="number"
                                                min="0"
                                                inputMode="numeric"
                                                value={data.salary_min}
                                                onChange={(event) =>
                                                    setData('salary_min', event.target.value)
                                                }
                                                placeholder="60000"
                                                className="pl-9"
                                            />
                                        </div>
                                        <InputError message={ errors.salary_min } />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="salary_max">Maximum salary</Label>
                                        <div className="relative">
                                            <PhilippinePeso className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="salary_max"
                                                type="number"
                                                min="0"
                                                inputMode="numeric"
                                                value={data.salary_max}
                                                onChange={(event) =>
                                                    setData('salary_max', event.target.value)
                                                }
                                                placeholder="90000"
                                                className="pl-9"
                                            />
                                        </div>
                                        <InputError message={ errors.salary_max } />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(event) =>
                                            setData('description', event.target.value)
                                        }
                                        placeholder="Describe the role, responsibilities, requirements, and team context."
                                        rows={9}
                                        className="flex min-h-40 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <InputError message={errors.description} />
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
                                <h2 className="font-semibold">Publishing</h2>
                                <p className="mt-1 text-sm text-muted-foregound">
                                    Choose how this opening enters the workspace.
                                </p>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={ data.status }
                                        onValueChange={ (value) => setData('status', value) }
                                    >
                                        <SelectTrigger id="status" className="w-full">
                                            <SelectValue placeholder="select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statuses.map((status) => (
                                                <SelectItem key={status.value} value={ status.value }>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
                                    Draft roles can be refined before applicants are reviewed. Open roles are ready for active hiring.
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row lg:flex-col-reverse">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href={jobOpenings.index()}>
                                            <ArrowLeft className="size-4" />
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={ processing }
                                    >
                                        {processing ? (
                                            <LoaderCircle className="size-4 animate-spin" />
                                        ) : data.status === 'open' ? (
                                            <Send className="size-4" />
                                        ) : (
                                            <Save className="size-4" />
                                        )}
                                        Create Job
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
            title: 'Job Openings',
            href: jobOpenings.index()
        },
        {
            title: 'Create New Job Opening',
            href: jobOpenings.create(),
        }
    ]
};