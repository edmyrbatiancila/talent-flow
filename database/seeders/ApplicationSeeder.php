<?php

namespace Database\Seeders;

use App\Models\Applicant;
use App\Models\Application;
use App\Models\JobOpening;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $applicants = Applicant::query()->get();
        $jobOpenings = JobOpening::query()->get();

        $applicants->each(function (Applicant $applicant) use ($jobOpenings) {
            Application::factory()
                ->count(fake()->numberBetween(1, 2))
                ->create([
                    'applicant_id' => $applicant->id,
                    'job_opening_id' => $jobOpenings->random()->id
                ]);
        });
    }
}
