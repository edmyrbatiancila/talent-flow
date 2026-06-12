
import { BriefcaseBusiness, ClipboardList, Gauge, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { StatKey } from "@/types/Dashboard";


export const statCards: {
    key: StatKey;
    label: string;
    icon: LucideIcon;
    tone: string;
}[] = [
    {
        key: 'applications',
        label: 'Total Applications',
        icon: ClipboardList,
        tone: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
    },
    {
        key: 'applicants',
        label: 'Unique Applicants',
        icon: UsersRound,
        tone: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
    },
    {
        key: 'jobOpenings',
        label: 'Job Openings',
        icon: BriefcaseBusiness,
        tone: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    },
    {
        key: 'openJobOpenings',
        label: 'Open Roles',
        icon: Gauge,
        tone: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    }
];