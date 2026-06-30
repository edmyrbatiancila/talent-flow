import type { ApplicationStage } from "@/types/Application";

export const stages: { label: string; value: ApplicationStage }[] = [
    { label: 'Applied', value: 'applied' },
    { label: 'Screening', value: 'screening' },
    { label: 'Interview', value: 'interview' },
    { label: 'Assessment', value: 'assessment' },
    { label: 'Offer', value: 'offer' },
    { label: 'Hired', value: 'hired' },
    { label: 'Rejected', value: 'rejected' },
];