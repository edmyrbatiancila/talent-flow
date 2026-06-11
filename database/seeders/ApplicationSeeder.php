<?php

namespace Database\Seeders;

use App\Models\Applicant;
use App\Models\Application;
use App\Models\JobOpening;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobOpenings = JobOpening::query()->get();

        if ($jobOpenings->isEmpty()) {
            return;
        }

        Applicant::query()->each(function (Applicant $applicant) use ($jobOpenings) {
            $count = min(fake()->numberBetween(1, 2), $jobOpenings->count());

            $jobOpenings
                ->random($count)
                ->each(function (JobOpening $jobOpening) use ($applicant) {
                    Application::factory()->create([
                        'applicant_id' => $applicant->id,
                        'job_opening_id' => $jobOpening->id,
                    ]);
                });
        });
    }
}
