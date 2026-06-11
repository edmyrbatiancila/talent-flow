# TalentFlow

TalentFlow is a practice-focused Applicant Tracking System (ATS) built with Laravel, React, TypeScript, Inertia.js, and Tailwind CSS.

The project is designed to help developers understand how a real recruitment workflow is modeled in a full-stack application: job openings are created, candidates apply, applications move through a hiring pipeline, and recruiters track the state of each candidate until a final hiring decision is made.

## Why This Project Exists

TalentFlow is not only a portfolio project. It is also a learning reference for developers who want to build an ATS from the ground up.

Use this project to study:

* How recruitment concepts map to database models.
* How an applicant can apply to one or more job openings through applications.
* How hiring stages are represented as application state.
* How Laravel controllers, requests, policies, resources, queries, services, factories, and tests can work together.
* How a backend-first project can later receive a polished frontend experience.

## What An ATS Usually Does

An Applicant Tracking System helps a company manage the hiring process from job planning to final decision. A realistic ATS flow usually looks like this:

1. **Create a job opening**
   A recruiter or hiring team defines the role, department, employment type, location, salary range, description, and status.

2. **Publish or open the role**
   The job becomes available for applicants. In a larger ATS, this may also connect to a public careers page or job boards.

3. **Receive applicants**
   Candidates submit their personal details, resume, cover letter, and the job they are applying for.

4. **Create an application record**
   The ATS connects the applicant to the job opening. This distinction matters because the same person may apply to multiple jobs over time.

5. **Move the application through the pipeline**
   Recruiters screen candidates and move each application through stages such as applied, screening, interview, assessment, offer, hired, or rejected.

6. **Review candidate context**
   Recruiters and hiring managers need to see resume data, application history, notes, feedback, and the current stage.

7. **Make a decision**
   The application ends in a terminal state such as hired or rejected. Real systems often store decision dates for reporting.

8. **Measure hiring performance**
   Teams review metrics such as total applicants, active applications, hired candidates, rejected candidates, time-to-hire, and funnel conversion.

TalentFlow currently focuses on the core middle of this workflow: job openings, applicants, applications, and pipeline stage changes.

## Current Project Scope

The backend foundation is already in place. The frontend still needs to be built for the main ATS screens.

### Implemented Backend Concepts

* Authentication and user accounts.
* Job opening management.
* Applicant management.
* Application records that connect applicants to job openings.
* Hiring pipeline stages.
* Stage changes with hired and rejected timestamps.
* Request validation.
* Authorization policies.
* Resource classes for frontend-facing data.
* Query classes for list filtering.
* Factories and seeders for practice data.
* Pest tests and GitHub Actions test workflow.

### Core Domain Models

* `User` - recruiter or system user.
* `JobOpening` - a role that a company is hiring for.
* `Applicant` - a person who wants to be considered for a role.
* `Application` - the relationship between an applicant and a job opening, including the current hiring stage.

The `Application` model is one of the most important pieces of the system. In real ATS design, an applicant is not the same thing as an application. An applicant is the person; an application is that person's submission for a specific job.

## Hiring Pipeline

TalentFlow uses the following application stages:

1. Applied
2. Screening
3. Interview
4. Assessment
5. Offer
6. Hired
7. Rejected

When an application moves to `hired`, the system stores `hired_at`. When it moves to `rejected`, the system stores `rejected_at`. This makes the project ready for future reporting features.

## Current Features

### Authentication

* Register
* Login
* Logout
* Email verification
* Profile settings
* Password management
* Two-factor authentication support

### Job Openings

* List job openings.
* Create a job opening.
* View job opening details.
* Edit a job opening.
* Archive a job opening instead of permanently deleting it.
* Filter and query job opening lists.

Common fields:

* Title
* Department
* Employment type
* Location
* Salary minimum
* Salary maximum
* Description
* Status
* Archived date

### Applicants

* List applicants.
* Create an applicant.
* Upload a resume.
* Attach the applicant to an open job.
* View applicant details with related applications.
* Edit applicant information.
* Delete an applicant.
* Filter and query applicant lists.

Common fields:

* First name
* Last name
* Email
* Phone
* Resume path
* Cover letter

### Applications

* Create an application when an applicant is added for a job opening.
* Store the applied date.
* Track the current hiring stage.
* Change the stage of an application.
* Store hired or rejected dates when the application reaches a final decision.

## Frontend To Build

The frontend should turn the backend into a usable ATS experience. Good first screens to build are:

* Dashboard with hiring statistics.
* Job openings index, create, edit, and detail pages.
* Applicants index, create, edit, and detail pages.
* Job detail page showing all applications for that role.
* Applicant detail page showing every job the person applied to.
* Pipeline view grouped by application stage.
* Stage update controls for moving candidates through the process.

A realistic frontend should make recruiters feel like they are working through a pipeline, not just editing database records.

## Recommended Development Path

Use the project as a guided practice build:

1. **Understand the domain**
   Start by reading the models, migrations, enums, and seeders. Make sure you understand the difference between applicants and applications.

2. **Run the backend**
   Install dependencies, configure the environment, migrate the database, and seed sample records.

3. **Explore the routes and controllers**
   Follow the request flow from route, to controller, to request validation, to service, to model, to resource response.

4. **Build list pages first**
   Create frontend pages for job openings and applicants. Lists are the easiest way to verify that backend data is flowing correctly.

5. **Build create and edit forms**
   Practice handling validation errors, enum fields, file uploads, and redirects with Inertia.

6. **Build detail pages**
   Show relationships clearly: a job has many applications, and an applicant has many applications.

7. **Build the hiring pipeline**
   Group applications by stage and allow recruiters to move candidates forward or reject them.

8. **Add tests as features grow**
   Keep feature tests focused on business behavior: creating applicants, creating applications, updating stages, and protecting routes.

## Installation

Install PHP and JavaScript dependencies:

```bash
composer install
npm install
```

Create the environment file and generate the application key:

```bash
cp .env.example .env
php artisan key:generate
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
php artisan key:generate
```

Run migrations and seeders:

```bash
php artisan migrate --seed
```

Start the development servers:

```bash
composer run dev
```

## Useful Commands

Run the full backend test workflow:

```bash
composer test
```

Run PHP formatting checks:

```bash
composer lint:check
```

Run frontend formatting and type checks:

```bash
npm run format:check
npm run types:check
```

## Tech Stack

### Backend

* Laravel 13
* PHP 8.4
* Eloquent ORM
* Laravel Fortify
* Laravel Policies
* Laravel Validation
* Pest

### Frontend

* React
* TypeScript
* Inertia.js
* Tailwind CSS
* Vite

### Development Tools

* Composer
* npm
* GitHub Actions
* Laravel Pint

## Suggested Practice Challenges

Use these challenges to turn the project into a deeper learning exercise:

* Build a dashboard that counts open jobs, total applicants, active applications, hired applications, and rejected applications.
* Build a stage-based pipeline view.
* Add recruiter notes to applications.
* Add interview scheduling.
* Add email notifications for interview, offer, and rejection updates.
* Add applicant source tracking.
* Add activity logs for important recruiter actions.
* Add role-based permissions for admin, recruiter, and hiring manager users.
* Add a public careers page where applicants can apply without logging in.
* Add reporting for hiring funnel conversion and time-to-hire.

## Future Features

### Phase 2

* Kanban recruitment board.
* Applicant notes and feedback.
* Activity logs.
* Email notifications.
* Interview scheduling.
* Resume parsing.
* Dashboard analytics.
* Role and permission management.

### Phase 3

* Public career pages.
* Candidate portal.
* Talent pool.
* Multi-company or multi-tenant architecture.
* Team management.
* Subscription billing.
* API integrations.

## Learning Goals

By studying and extending TalentFlow, a developer should become more comfortable with:

* Designing real-world domain models.
* Separating applicants from applications.
* Modeling status and stage transitions with enums.
* Building Laravel services for business actions.
* Using form request classes for validation.
* Protecting resources with policies.
* Returning structured data through API resources.
* Building Inertia-powered React pages on top of a Laravel backend.
* Growing a project from backend foundation to full product experience.

## Project Goal

TalentFlow aims to become a realistic ATS practice project: simple enough for learning, but structured closely enough to real recruitment software that developers can use it as a serious reference when building their own hiring platforms.
