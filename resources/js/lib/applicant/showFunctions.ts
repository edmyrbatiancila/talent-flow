import type { Applicant, ApplicantApplication } from "@/types/Applicant";

export function getLatestApplication(application: ApplicantApplication[]) {
    return application
        .filter((application) => application.applied_at)
        .sort(
            (first, second) =>
                new Date(second.applied_at ?? '').getTime() - 
                new Date(first.applied_at ?? '').getTime(),
        )[0];
}

export function getApplicantInitials(applicant: Applicant) {
    return `${applicant.first_name[0] ?? ''}${applicant.last_name[0] ?? ''}`
        .toUpperCase()
        .trim();
}
