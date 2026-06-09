<?php

namespace Database\Factories;

use App\Enums\EmploymentType;
use App\Enums\JobOpeningStatus;
use App\Models\JobOpening;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobOpening>
 */
class JobOpeningFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $salaryMin = fake()->numberBetween(30000, 90000);

        return [
            'user_id' => User::factory(),
            'title' => fake()->jobTitle(),
            'department' => fake()->randomElement([
                'Engineering',
                'Human Resources',
                'Marketing',
                'Sales',
                'Finance',
                'Operations'
            ]),
            'employment_type' => fake()->randomElement(EmploymentType::cases())->value,
            'location' => fake()->city(),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMin + fake()->numberBetween(10000, 60000),
            'description' => fake()->paragraphs(3, true),
            'status' => fake()->randomElement(JobOpeningStatus::cases())->value,
            'archived_at' => null
        ];
    }

    public function open(): static
    {
        return $this->state(fn () => [
            'status' => JobOpeningStatus::Open->value,
            'archived_at' => null,
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn () => [
            'status' => JobOpeningStatus::Archived->value,
            'archived_at' => now(),
        ]);
    }
}
