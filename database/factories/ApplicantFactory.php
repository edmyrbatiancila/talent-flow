<?php

namespace Database\Factories;

use App\Models\Applicant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Applicant>
 */
class ApplicantFactory extends Factory
{
    protected $model = Applicant::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'resume_path' => fake()->optional()->randomElement([
                'resumes/sample-resume-1.pdf',
                'resumes/sample-resume-2.pdf',
                'resumes/sample-resume-3.pdf',
            ]),
            'cover_letter' => fake()->optional()->paragraphs(2, true),
        ];
    }
}
