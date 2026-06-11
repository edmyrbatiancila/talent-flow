<?php

namespace App\Http\Controllers;

use App\Enums\JobOpeningStatus;
use App\Http\Requests\ListJobOpeningsRequest;
use App\Http\Requests\StoreJobOpeningRequest;
use App\Http\Requests\UpdateJobOpeningRequest;
use App\Http\Resources\JobOpeningResource;
use App\Models\JobOpening;
use App\Queries\JobOpeningQuery;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class JobOpeningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListJobOpeningsRequest $request, JobOpeningQuery $query): Response
    {
        return Inertia::render('job-openings/index', [
            'jobOpenings' => JobOpeningResource::collection($query->paginate($request->validated())),
            'filters' => $request->validated(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', JobOpening::class);

        return Inertia::render('job-openings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobOpeningRequest $request)
    {
        $jobOpening = $request->user()->jobOpenings()->create($request->validated());

        return to_route('job-openings.show', $jobOpening);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobOpening $jobOpening): Response
    {
        Gate::authorize('view', $jobOpening);

        return Inertia::render('job-openings/show', [
            'jobOpening' => new JobOpeningResource(
                $jobOpening->load(['user:id,name', 'applications.applicant'])
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobOpening $jobOpening): Response
    {
        Gate::authorize('update', $jobOpening);

        return Inertia::render('job-openings/edit', [
            'jobOpening' => new JobOpeningResource($jobOpening),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobOpeningRequest $request, JobOpening $jobOpening)
    {
        $jobOpening->update($request->validated());

        return to_route('job-openings.show', $jobOpening);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobOpening $jobOpening)
    {
        Gate::authorize('delete', $jobOpening);

        $jobOpening->update([
            'status' => JobOpeningStatus::Archived,
            'archived_at' => now(),
        ]);

        return to_route('job-openings.index');
    }
}
