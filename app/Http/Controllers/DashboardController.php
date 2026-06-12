<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStage;
use App\Enums\JobOpeningStatus;
use App\Models\Application;
use App\Models\JobOpening;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $jobOpeningQuery = JobOpening::query()
            ->where('user_id', $user->id);

        $applicationQuery = Application::query()
            ->whereHas('JobOpening', fn ($query) => $query->where('user_id', $user->id));

        $stageCounts = (clone $applicationQuery)
            ->selectRaw('stage, count(*) as total')
            ->groupBy('stage')
            ->pluck('total', 'stage');

        $pipeline = collect(ApplicationStage::cases())->map(fn ($stage) => [
            'stage' => $stage->value,
            'label' => str($stage->value)->headline()->toString(),
            'total' => (int) ($stageCounts[$stage->value] ?? 0),
        ])->values();

        return Inertia::render('dashboard', [
            'stats' => [
                'jobOpenings' => (clone $jobOpeningQuery)->count(),
                'openJobOpenings' => (clone $jobOpeningQuery)
                    ->where('status', JobOpeningStatus::Open)
                    ->count(),
                'applicants' => (clone $applicationQuery)
                    ->select('applicant_id')
                    ->distinct()
                    ->count(),
                'applications' => (clone $applicationQuery)->count(),
                'hired' => (clone $applicationQuery)
                    ->where('stage', ApplicationStage::Hired)
                    ->count(),
                'rejected' => (clone $applicationQuery)
                    ->where('stage', ApplicationStage::Rejected)
                    ->count(),
            ],
            'pipeline' => $pipeline,
            'recentJobOpenings' => (clone $jobOpeningQuery)
                ->withCount('applications')
                ->latest()
                ->limit(5)
                ->get(['id', 'title', 'department', 'status', 'created_at'])
                ->map(fn ($job) => [
                    'id' => $job->id,
                    'title' => $job->title,
                    'department' => $job->department,
                    'status' => $job->status->value,
                    'applications_count' => $job->applications_count,
                ]),
            'recentApplications' => (clone $applicationQuery)
                ->with(['applicant:id,first_name,last_name', 'jobOpening:id,title'])
                ->latest('applied_at')
                ->limit(5)
                ->get()
                ->map(fn ($application) => [
                    'id' => $application->id,
                    'applicant' => $application->applicant->full_name,
                    'job' => $application->jobOpening->title,
                    'stage' => str($application->stage->value)->headline()->toString(),
                    'applied_at' => $application->applied_at?->diffForHumans(),
                ]),
        ]);
    }
}
