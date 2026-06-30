<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListApplicantsRequest;
use App\Http\Requests\StoreApplicantRequest;
use App\Http\Requests\UpdateApplicantRequest;
use App\Http\Resources\ApplicantResource;
use App\Models\Applicant;
use App\Models\JobOpening;
use App\Queries\ApplicantQuery;
use App\Services\CreateApplicantService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListApplicantsRequest $request, ApplicantQuery $query): Response
    {
        return Inertia::render('applicants/index', [
            'applicants' => ApplicantResource::collection($query->paginate($request->validated())),
            'filters' => $request->validated(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Applicant::class);

        return Inertia::render('applicants/create', [
            'jobOpenings' => JobOpening::query()
                ->where('status', 'open')
                ->orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicantRequest $request, CreateApplicantService $service)
    {
        $applicant = $service->handle(
            $request->validated(),
            $request->file('resume')
        );

        return to_route('applicants.show', $applicant);
    }

    /**
     * Display the specified resource.
     */
    public function show(Applicant $applicant): Response
    {
        Gate::authorize('view', $applicant);

        return Inertia::render('applicants/show', [
            'applicant' => new ApplicantResource(
                $applicant->load('applications.jobOpening')
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Applicant $applicant): Response
    {
        Gate::authorize('update', $applicant);

        return Inertia::render('applicants/edit', [
            'applicant' => new ApplicantResource($applicant),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicantRequest $request, Applicant $applicant)
    {
        $data = $request->validated();

        if ($request->hasFile('resume')) {
            if ($applicant->resume_path) {
                Storage::disk('public')->delete($applicant->resume_path);
            }

            $data['resume_path'] = $request->file('resume')->store('resumes', 'public');
        }

        unset($data['resume'], $data['job_opening_id']);

        $applicant->update($data);

        return to_route('applicants.show', $applicant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Applicant $applicant)
    {
        Gate::authorize('delete', $applicant);

        $applicant->delete();

        return to_route('applicants.index');
    }
}
