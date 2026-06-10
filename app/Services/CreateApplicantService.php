<?php


namespace App\Services;

use App\Enums\ApplicationStage;
use App\Models\Applicant;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CreateApplicantService
{
    public function handle(array $data, ?UploadedFile $resume = null): Applicant
    {
        return DB::transaction(function () use ($data, $resume) {
            $resumePath = $resume?->store('resumes', 'public');

            $applicant = Applicant::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'resume_path' => $resumePath,
                'cover_letter' => $data['cover_letter'] ?? null
            ]);

            $applicant->applications()->create([
                'job_opening_id' => $data['job_opening_id'],
                'stage' => ApplicationStage::Applied,
                'applied_at' => now()
            ]);

            return $applicant;
        });
    }
}