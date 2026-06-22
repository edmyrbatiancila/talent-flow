import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BriefcaseBusiness,
    Building2,
    ClipboardList,
    FileSearch,
    MapPin,
    NotebookText,
    Search,
    Sparkles,
    UserCheck,
    UsersRound,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TalentFlowLogo from '@/components/welcome/TalentFlowLogo';
import { formatSalary } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';
import type { WelcomeProps } from '@/types/global';

export default function Welcome() {
    const { auth, jobOpenings } = usePage<WelcomeProps>().props;
    const [search, setSearch] = useState('');

    const jobs = jobOpenings.data;

    const filteredJobs = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return jobs;
        }

        return jobs.filter((job) =>
            [job.title, job.department, job.employment_type, job.location]
                .join(' ')
                .toLowerCase()
                .includes(keyword),
        );
    }, [jobs, search]);

    return (
        <>
            <Head title="TalentFlow Careers" />

            <main className="min-h-screen bg-slate-50 text-slate-950">
                <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
                        <TalentFlowLogo />

                        <nav className="flex items-center gap-2">
                            {auth.user ? (
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-indigo-700 text-white shadow-sm hover:bg-indigo-800"
                                >
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-slate-700 hover:bg-white hover:text-slate-950"
                                    >
                                        <Link href={login()}>Log in</Link>
                                    </Button>

                                    <Button
                                        asChild
                                        size="sm"
                                        className="bg-indigo-700 text-white shadow-sm hover:bg-indigo-800"
                                    >
                                        <Link href={register()}>
                                            Create account
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

                    <motion.div
                        className="absolute top-[-160px] right-[-160px] size-[420px] rounded-full bg-indigo-200/40 blur-3xl"
                        animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
                        transition={{
                            duration: 11,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <motion.div
                        className="absolute bottom-[-180px] left-[-140px] size-[380px] rounded-full bg-emerald-200/35 blur-3xl"
                        animate={{ y: [0, -18, 0], x: [0, 14, 0] }}
                        transition={{
                            duration: 13,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-24 pb-6 lg:px-8">
                        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr]">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="max-w-2xl"
                            >
                                <Badge className="mb-5 gap-2 rounded-md border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-50">
                                    <Sparkles className="size-3.5" />
                                    Modern hiring starts here
                                </Badge>

                                <h1 className="max-w-xl text-5xl font-semibold tracking-normal text-slate-950 md:text-6xl">
                                    Find the role where your next chapter moves
                                    faster.
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                                    TalentFlow connects candidates with active
                                    openings while helping recruiters keep every
                                    applicant, stage, and hiring decision
                                    organized.
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <Button
                                        asChild
                                        className="bg-indigo-700 text-white shadow-sm hover:bg-indigo-800"
                                    >
                                        <a href="#openings">
                                            Explore openings
                                            <ArrowRight className="size-4" />
                                        </a>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                                    >
                                        <a href="#about-talentflow">
                                            Learn about TalentFlow
                                        </a>
                                    </Button>
                                </div>

                                <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                                    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                                        <BriefcaseBusiness className="mb-3 size-5 text-indigo-700" />
                                        <p className="text-2xl font-semibold">
                                            {jobs.length}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Open roles
                                        </p>
                                    </div>

                                    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                                        <UsersRound className="mb-3 size-5 text-emerald-700" />
                                        <p className="text-2xl font-semibold">
                                            7
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Hiring stages
                                        </p>
                                    </div>

                                    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                                        <Building2 className="mb-3 size-5 text-slate-700" />
                                        <p className="text-2xl font-semibold">
                                            ATS
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Recruiter-ready
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.12 }}
                                id="openings"
                                className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5"
                            >
                                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Current job openings
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Search by role, department, type, or
                                            location.
                                        </p>
                                    </div>

                                    <Badge
                                        variant="secondary"
                                        className="w-fit rounded-md bg-slate-100 text-slate-700"
                                    >
                                        {filteredJobs.length} shown
                                    </Badge>
                                </div>

                                <div className="relative mb-4">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search open roles..."
                                        className="h-11 rounded-md border-slate-200 bg-white pl-9 text-slate-950 placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="grid max-h-[520px] gap-3 overflow-y-auto pr-1">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map((job) => (
                                            <Link
                                                key={job.id}
                                                href={`/job-openings/${job.id}`}
                                                className="group rounded-md border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-md"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-semibold text-slate-950 group-hover:text-indigo-800">
                                                            {job.title}
                                                        </h3>

                                                        <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-500">
                                                            <span>
                                                                {job.department}
                                                            </span>
                                                            <span>/</span>
                                                            <span>
                                                                {
                                                                    job.employment_type
                                                                }
                                                            </span>
                                                            <span>/</span>
                                                            <span className="inline-flex items-center gap-1">
                                                                <MapPin className="size-3.5" />
                                                                {job.location}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ArrowRight className="mt-1 size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-700" />
                                                </div>

                                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                                                    {job.description}
                                                </p>

                                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-md border-slate-200 bg-white text-slate-700"
                                                    >
                                                        {formatSalary(
                                                            job.salary_min,
                                                            job.salary_max,
                                                        )}
                                                    </Badge>

                                                    <span className="inline-flex h-7 items-center rounded-md bg-indigo-700 px-2.5 text-xs font-medium text-white transition group-hover:bg-indigo-800">
                                                        View and apply
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                                            <p className="font-medium">
                                                No matching roles found.
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Try searching another
                                                department, location, or job
                                                title.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        <motion.a
                            href="#about-talentflow"
                            className="mx-auto mb-6 hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur transition hover:text-slate-950 lg:flex"
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            Scroll to explore
                            <ArrowRight className="size-4 rotate-90" />
                        </motion.a>
                    </div>
                </section>

                <section
                    id="about-talentflow"
                    className="border-b border-slate-200 bg-white"
                >
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge className="mb-5 rounded-md border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                Built for recruitment teams
                            </Badge>

                            <h2 className="max-w-xl text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                                One organized place for jobs, applicants, and
                                hiring progress.
                            </h2>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                                TalentFlow is a recruitment and applicant
                                tracking system made to simplify the hiring
                                workflow. Recruiters can manage job openings,
                                track applicants, move candidates through
                                stages, and keep important hiring notes in one
                                focused workspace.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="grid gap-3 sm:grid-cols-2"
                        >
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                <ClipboardList className="mb-4 size-6 text-indigo-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Job management
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Create, edit, archive, and review job
                                    openings with clear role details.
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                <UsersRound className="mb-4 size-6 text-emerald-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Applicant tracking
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Keep candidate profiles, contact details,
                                    resumes, and applications connected.
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                <NotebookText className="mb-4 size-6 text-slate-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Hiring notes
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Capture screening feedback, interview notes,
                                    and hiring manager comments.
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                <BarChart3 className="mb-4 size-6 text-indigo-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Dashboard insights
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    See open roles, applicant counts, active
                                    candidates, hires, and rejections.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <Badge className="mb-5 rounded-md border-white/10 bg-white/10 text-white hover:bg-white/10">
                                Hiring pipeline
                            </Badge>

                            <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
                                Follow every candidate from application to final
                                decision.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-slate-300">
                                The MVP pipeline gives recruiters a clear path
                                for evaluating applicants without losing context
                                between stages.
                            </p>
                        </motion.div>

                        <div className="mt-10 grid gap-3 md:grid-cols-7">
                            {[
                                'Applied',
                                'Screening',
                                'Interview',
                                'Assessment',
                                'Offer',
                                'Hired',
                                'Rejected',
                            ].map((stage, index) => (
                                <motion.div
                                    key={stage}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.05,
                                    }}
                                    className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                                >
                                    <div className="mb-4 flex size-9 items-center justify-center rounded-md bg-white text-sm font-semibold text-slate-950">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm font-medium">
                                        {stage}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-3 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1"
                        >
                            <Badge className="mb-5 rounded-md border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-50">
                                Built to grow
                            </Badge>

                            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                                From MVP ATS to future recruitment platform.
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="grid gap-3 sm:grid-cols-2 lg:col-span-2"
                        >
                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                                <FileSearch className="mb-4 size-6 text-indigo-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Search and filters
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Find applicants by name, email, job
                                    position, hiring stage, and application
                                    date.
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                                <UserCheck className="mb-4 size-6 text-emerald-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Candidate decisions
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Track active applicants, hired candidates,
                                    rejected candidates, and stage changes.
                                </p>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
                                <Sparkles className="mb-4 size-6 text-indigo-700" />
                                <h3 className="font-semibold text-slate-950">
                                    Long-term product vision
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    TalentFlow can grow into a SaaS recruitment
                                    platform with company accounts, team
                                    management, public career pages, candidate
                                    portals, reports, scheduling, and resume
                                    parsing.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
                        <div>
                            <TalentFlowLogo />
                            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                                TalentFlow is a modern recruitment and applicant
                                tracking system for managing job openings,
                                applicants, hiring stages, notes, and hiring
                                decisions in one place.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-slate-950">
                                Explore
                            </h2>
                            <div className="mt-4 grid gap-3 text-sm text-slate-600">
                                <a
                                    href="#openings"
                                    className="transition hover:text-indigo-700"
                                >
                                    Job openings
                                </a>
                                <a
                                    href="#about-talentflow"
                                    className="transition hover:text-indigo-700"
                                >
                                    About TalentFlow
                                </a>
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="transition hover:text-indigo-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={login()}
                                        className="transition hover:text-indigo-700"
                                    >
                                        Recruiter login
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-slate-950">
                                Built With
                            </h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    'Laravel',
                                    'React',
                                    'TypeScript',
                                    'Inertia',
                                    'Tailwind CSS',
                                    'shadcn/ui',
                                ].map((item) => (
                                    <Badge
                                        key={item}
                                        variant="outline"
                                        className="rounded-md border-slate-200 bg-slate-50 text-slate-700"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-200">
                        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                            <p>
                                TalentFlow Recruitment ATS. Built for real-world
                                full-stack practice.
                            </p>
                            <p>Modern hiring workflows, simplified.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
