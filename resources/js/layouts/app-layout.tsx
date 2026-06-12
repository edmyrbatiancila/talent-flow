import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    stickyHeader = false,
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    stickyHeader?: boolean;
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate
            breadcrumbs={breadcrumbs}
            stickyHeader={stickyHeader}
        >
            {children}
        </AppLayoutTemplate>
    );
}
