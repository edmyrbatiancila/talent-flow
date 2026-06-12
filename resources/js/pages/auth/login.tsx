import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    ClipboardList,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UsersRound,
} from 'lucide-react';
import { motion } from 'motion/react';

import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import TalentFlowLogo from '@/components/welcome/TalentFlowLogo';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const pipelineStages = ['Applied', 'Screening', 'Interview', 'Offer'];

const recruiterBenefits = [
    'Manage active job openings',
    'Review applicants and resumes',
    'Move candidates through stages',
];

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Recruiter Login" />

            <PasskeyVerify />

            <main className="fixed inset-0 z-50 min-h-screen overflow-y-auto bg-slate-50 text-slate-950">
                <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                    <motion.section
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="flex min-h-[42rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <TalentFlowLogo />

                            <div className="hidden items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 sm:flex">
                                <ShieldCheck className="size-4" />
                                Recruiter portal
                            </div>
                        </div>

                        <div className="my-12 max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800">
                                <BriefcaseBusiness className="size-4" />
                                TalentFlow ATS workspace
                            </div>

                            <h1 className="text-4xl font-semibold tracking-normal text-slate-950 md:text-5xl">
                                Sign in to manage jobs, applicants, and hiring
                                decisions.
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                                Continue into the recruiter dashboard where job
                                openings, candidate records, applications, and
                                pipeline stages stay connected in one focused
                                workflow.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                                    <ClipboardList className="mb-3 size-5 text-indigo-700" />
                                    <p className="text-sm font-semibold text-slate-950">
                                        Job openings
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create, edit, view, and archive roles.
                                    </p>
                                </div>

                                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                                    <UsersRound className="mb-3 size-5 text-emerald-700" />
                                    <p className="text-sm font-semibold text-slate-950">
                                        Applicants
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Track candidates across applications.
                                    </p>
                                </div>

                                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                                    <ArrowRight className="mb-3 size-5 text-slate-700" />
                                    <p className="text-sm font-semibold text-slate-950">
                                        Pipeline
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Move people through hiring stages.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold">
                                        Today&apos;s workflow
                                    </p>
                                    <p className="mt-1 text-sm text-slate-300">
                                        Follow every application from first
                                        review to final decision.
                                    </p>
                                </div>
                                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-950">
                                    7 stages
                                </span>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-4">
                                {pipelineStages.map((stage, index) => (
                                    <motion.div
                                        key={stage}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.35,
                                            delay: 0.1 + index * 0.06,
                                        }}
                                        className="rounded-md border border-white/10 bg-white/[0.06] p-3"
                                    >
                                        <span className="mb-3 flex size-7 items-center justify-center rounded-md bg-white text-xs font-semibold text-slate-950">
                                            {index + 1}
                                        </span>
                                        <p className="text-sm font-medium">
                                            {stage}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <section className="flex items-center justify-center py-6 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.08 }}
                            className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8"
                        >
                            <div className="mb-8">
                                <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-indigo-700 text-white shadow-sm">
                                    <LockKeyhole className="size-5" />
                                </div>

                                <h2 className="text-2xl font-semibold tracking-normal text-slate-950">
                                    Welcome back, recruiter
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Use your TalentFlow account to continue
                                    managing hiring operations.
                                </p>
                            </div>

                            {status && (
                                <div className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                disableWhileProcessing
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-5">
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-slate-800"
                                                >
                                                    Email address
                                                </Label>
                                                <div className="relative">
                                                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="email"
                                                        placeholder="recruiter@company.com"
                                                        className="h-11 border-slate-300 bg-white pl-9 text-slate-950 placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-200"
                                                    />
                                                </div>
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <div className="flex items-center gap-3">
                                                    <Label
                                                        htmlFor="password"
                                                        className="text-slate-800"
                                                    >
                                                        Password
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="ml-auto text-sm font-medium text-indigo-700 hover:text-indigo-800"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    className="h-11 border-slate-300 bg-white text-slate-950 placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-indigo-200"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        id="remember"
                                                        name="remember"
                                                        tabIndex={3}
                                                        className="border-slate-300 data-[state=checked]:border-indigo-700 data-[state=checked]:bg-indigo-700"
                                                    />
                                                    <Label
                                                        htmlFor="remember"
                                                        className="text-sm text-slate-700"
                                                    >
                                                        Remember this device
                                                    </Label>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="h-11 w-full bg-indigo-700 text-white shadow-sm hover:bg-indigo-800 focus-visible:ring-indigo-200"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing && <Spinner />}
                                                Sign in to TalentFlow
                                            </Button>
                                        </div>

                                        <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-sm font-medium text-slate-950">
                                                After signing in, you can:
                                            </p>
                                            <div className="mt-3 grid gap-2">
                                                {recruiterBenefits.map(
                                                    (benefit) => (
                                                        <div
                                                            key={benefit}
                                                            className="flex items-center gap-2 text-sm text-slate-600"
                                                        >
                                                            <CheckCircle2 className="size-4 text-emerald-700" />
                                                            {benefit}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center text-sm text-slate-600">
                                            Need recruiter access?{' '}
                                            <TextLink
                                                href={register()}
                                                tabIndex={6}
                                                className="font-medium text-indigo-700 hover:text-indigo-800"
                                            >
                                                Create an account
                                            </TextLink>
                                        </div>
                                    </>
                                )}
                            </Form>

                            <div className="mt-6 border-t border-slate-200 pt-5 text-center text-xs leading-5 text-slate-500">
                                Protected authentication for TalentFlow ATS
                                users.
                                <br />
                                <Link
                                    href="/"
                                    className="font-medium text-slate-700 transition hover:text-indigo-700"
                                >
                                    Return to public careers page
                                </Link>
                            </div>
                        </motion.div>
                    </section>
                </div>
            </main>
        </>
    );
}

Login.layout = {
    title: '',
    description: '',
};
