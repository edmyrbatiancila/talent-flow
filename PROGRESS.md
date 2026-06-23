# TalentFlow Project Progress

This file tracks the current state of TalentFlow as a Laravel + Inertia + React applicant tracking system. It is intentionally concise and should describe what exists in the codebase, not aspirational features.

## Project Status Journal

### June 12, 2026

Today's snapshot shows TalentFlow moving from a backend-first ATS foundation into a usable recruiter workspace. The project now has authenticated recruiter routes, core hiring models, backend CRUD endpoints for job openings and applicants, applicant-to-job application creation, application stage updates, a real dashboard data source, and frontend index screens for job openings and applicants.

The current gap is mostly in the remaining recruiter workflow screens. Several backend routes already point to Inertia pages that have not been created yet, so create, show, and edit screens for job openings and applicants are still pending. A dedicated applications view or pipeline board also has not been built yet.

### June 15, 2026

The job opening create workflow was started on the frontend. `resources/js/pages/job-openings/create.tsx` now provides a responsive Inertia form aligned with the existing job openings index design and the backend `StoreJobOpeningRequest` fields. Supporting frontend structure was also added for the create form data shape, job opening select option arrays, and reusable field error rendering.

The next recruiter workflow gap is the remaining job opening show and edit pages, followed by the applicant create, show, and edit pages.

### June 22, 2026

The job opening edit workflow is now implemented on the frontend. `resources/js/pages/job-openings/edit.tsx` provides a responsive shadcn-based Inertia form that loads the selected job opening's existing values, submits updates through the generated resource route, displays backend validation errors, tracks unsaved changes, and supports resetting the form to its initial values.

The edit page now correctly handles the Laravel JSON resource payload returned by `JobOpeningController::edit()`. A single `JobOpeningResource` reaches the Inertia page under the resource's `data` wrapper, so the page unwraps `jobOpening.data` before initializing `useForm`. Nullable salary values are also converted to strings so they work correctly as controlled HTML inputs.

The existing backend edit and update flow was rechecked and did not require a new endpoint: authorization is handled by the job opening policy and `UpdateJobOpeningRequest`, validated updates are persisted by `JobOpeningController::update()`, and successful updates redirect to the job opening detail route. Frontend TypeScript and ESLint checks pass for the current create and edit pages.

The next immediate gap is `resources/js/pages/job-openings/show.tsx`. Both job creation and job updates redirect to the show route, so that detail page should be completed before moving to the applicant forms.

## Backend Progress

### Finished

- Laravel app is set up with Inertia, React, TypeScript, Tailwind CSS, Fortify, Pest, and Laravel Pint.
- Authentication and account management are available:
  - Registration, login, logout, email verification, password reset, and password confirmation
  - Profile, password, two-factor authentication, and passkey-related account screens/components
- Core ATS models exist:
  - `User`
  - `JobOpening`
  - `Applicant`
  - `Application`
- Database migrations, factories, and seeders exist for the core ATS tables.
- Model relationships are in place:
  - Users own job openings.
  - Job openings have applications.
  - Applicants have applications.
  - Applications belong to applicants and job openings.
- Enums exist for fixed workflow values:
  - `ApplicationStage`
  - `EmploymentType`
  - `JobOpeningStatus`
- Authenticated routes are registered for:
  - `dashboard`
  - `job-openings` resource routes
  - `applicants` resource routes
  - `applications/{application}/stage` patch route
- Job opening backend flow supports:
  - Listing with pagination
  - Search by title, department, or location
  - Status filtering
  - Create, show, edit, update, and archive behavior
  - Edit payloads returned through `JobOpeningResource` with policy authorization
  - Update validation through `UpdateJobOpeningRequest`
  - Archiving by setting status to `archived` and `archived_at`
- Applicant backend flow supports:
  - Listing with pagination
  - Search by first name, last name, or email
  - Filtering by application stage, job opening, and application date range
  - Create with optional resume upload
  - Automatic initial application creation for the selected job opening
  - Show, edit, update, and delete behavior
- Application stage updates are implemented:
  - Stage changes go through `ApplicationStageController`
  - Moving to `hired` sets `hired_at`
  - Moving to `rejected` sets `rejected_at`
  - Moving away from final stages clears the corresponding final timestamp
- Dashboard backend data is implemented in `DashboardController`:
  - Total job openings
  - Open job openings
  - Unique applicants across the current user's job openings
  - Total applications
  - Hired and rejected counts
  - Pipeline counts by application stage
  - Recent job openings
  - Recent applications
- Backend structure uses form requests, resources, query classes, services, and policies:
  - `CreateApplicantService`
  - `ChangeApplicationStageService`
  - `JobOpeningQuery`
  - `ApplicantQuery`
  - `JobOpeningResource`
  - `ApplicantResource`
  - `ApplicationResource`

### Backend Still Missing Or Incomplete

- `ApplicationController` is still scaffold-only. Applications are currently created through applicant creation, and stage updates are handled separately.
- There is no full application CRUD flow yet for listing, viewing, creating for an existing applicant, editing metadata, deleting, or withdrawing applications.
- Applicant and application policies are still permissive. Job opening update/delete authorization checks ownership, but applicant/application ownership rules are not fully modeled.
- Applicant listing is not currently scoped to the authenticated user's job openings, while dashboard metrics are user-scoped through job openings.
- Resume replacement stores the new resume but does not delete the old uploaded file.
- Application stage changes do not store a history of who changed the stage or what the previous stage was.
- Recruiter notes, interview records, feedback, candidate sources, and activity logs are not modeled yet.
- There are no ATS-specific feature tests for job openings, applicants, application creation, filters, or stage changes yet.

## Frontend Progress

### Finished

- Inertia + React frontend is set up with TypeScript.
- App shell, sidebar/header layouts, auth layouts, settings layout, and reusable UI components exist.
- Authentication pages exist:
  - Login
  - Register
  - Forgot password
  - Reset password
  - Confirm password
  - Verify email
  - Two-factor challenge
- Settings pages exist:
  - Profile
  - Security
  - Appearance
- Welcome page exists at `/` and lists open job openings from the backend with client-side search.
- Sidebar navigation now includes:
  - Dashboard
  - Job Openings
  - Applicants
- Dashboard page now renders real backend data:
  - Stat cards
  - Active applications count
  - Hired and rejected counts
  - Pipeline stage bars
  - Recent applications
  - Recent job openings
- Job openings frontend now includes:
  - Create page with form fields for title, department, employment type, location, salary range, description, and status
  - Edit page that preloads existing values from the wrapped job opening resource
  - Edit form submission through the generated PUT resource route
  - Unsaved-change tracking, reset controls, loading state, and validation error rendering
  - Responsive shadcn UI cards, inputs, selects, labels, and buttons shared with the existing design
  - Paginated list
  - Search form
  - Status filter controls
  - Empty state
  - Pagination links
  - View links to the pending detail page and working edit links
- Applicants index page exists:
  - Paginated list
  - Search form
  - Stage filter controls
  - Applied date range filters
  - Empty state
  - Pagination links
  - View/edit links to pending pages
- Frontend types exist for dashboard, job opening, applicant, application stage, and pagination payloads.

### Frontend Still Missing Or Incomplete

- These Inertia pages are referenced by routes/controllers but do not exist yet:
  - `resources/js/pages/job-openings/show.tsx`
  - `resources/js/pages/applicants/create.tsx`
  - `resources/js/pages/applicants/show.tsx`
  - `resources/js/pages/applicants/edit.tsx`
- Dashboard quick actions still link to pending applicant create flow.
- Job opening show links and applicant show/edit links still point to pending pages.
- There is no frontend form yet for creating or editing applicants or uploading resumes.
- There is no applicant detail UI showing all applications for that applicant.
- There is no job opening detail UI showing applications for that role.
- There is no recruiter-facing UI yet for changing an application's stage.
- There is no applications index or kanban-style pipeline board.

## Database Progress

### Finished

- `job_openings` table includes owner, title, department, employment type, location, salary range, description, status, and archive timestamp fields.
- `applicants` table includes name, email, phone, resume path, and cover letter fields.
- `applications` table separates candidate identity from job applications with applicant, job opening, stage, applied, hired, and rejected timestamps.
- Indexes exist for common filtering fields.
- A unique constraint prevents the same applicant from applying to the same job opening more than once.

### Improvements To Consider

- Add stage history for auditability.
- Add application notes and interview scheduling tables.
- Add candidate source tracking.
- Consider soft deletes if recovery is important.
- Decide whether applicants should be scoped by recruiter, company, or tenant before strengthening multi-user access.

## Testing And Tooling Progress

### Finished

- Pest is installed and configured.
- Laravel Pint is configured.
- Composer scripts exist for local development, tests, linting, formatting, and CI-style checks.
- npm scripts exist for Vite dev, production build, ESLint, Prettier, and TypeScript checks.

### Latest Local Check

- `npm run types:check` was run on June 22, 2026 and passed.
- ESLint was run on June 22, 2026 for the job opening create and edit pages and passed.
- `php artisan test` was previously run on June 12, 2026.
- Result: test execution did not complete because the local PHP installation is missing the SQLite PDO driver.
- Test database connection: `sqlite`
- Test database: `:memory:`
- Error: `could not find driver`
- Next environment step: enable or install the PHP SQLite extension, then rerun `php artisan test`.

### Testing Still Needed

- Feature tests for job opening creation, update, archive, listing, and filtering.
- Feature tests for applicant creation, update, deletion, resume upload, listing, and filtering.
- Tests confirming applicant creation creates the initial application.
- Feature tests for application stage changes and `hired_at` / `rejected_at` behavior.
- Authorization tests for job opening ownership.
- Future authorization tests for applicant and application access rules after ownership is modeled.

## Recommended Next Build Order

1. Add the missing job opening show page, including the role details and related applications.
2. Add the missing applicant create, show, and edit pages, including resume upload.
3. Add stage update controls on applicant or job opening detail pages.
4. Add feature tests around the current ATS backend behavior.
5. Add an applications index or pipeline board grouped by stage.
6. Tighten applicant and application authorization once ownership rules are clear.
7. Add notes, interviews, and activity history.

## Current MVP Definition

The MVP will feel complete when a recruiter can:

- Register and log in.
- Create and manage job openings.
- Create applicants and attach them to job openings.
- View applicants and their applications.
- View job openings and their applicants.
- Move candidates through the hiring pipeline.
- See basic dashboard counts.
- Archive closed job openings.
- Use the app without manually touching the database.
