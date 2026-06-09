<?php

namespace Database\Factories;

use App\Enums\ApplicationStage;
use App\Models\Applicant;
use App\Models\Application;
use App\Models\JobOpening;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    protected $model = Application::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'applicant_id' => Applicant::factory(),
            'job_opening_id' => JobOpening::factory(),
            'stage' => fake()->randomElement(ApplicationStage::cases())->value,
            'applied_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'hired_at' => null,
            'rejected_at' => null
        ];
    }

    public function applied(): static
    {
        return $this->state(fn () => [
            'stage' => ApplicationStage::Applied->value,
            'hired_at' => null,
            'rejected_at' => null,
        ]);
    }

    public function hired(): static
    {
        return $this->state(fn () => [
            'stage' => ApplicationStage::Hired->value,
            'hired_at' => now(),
            'rejected_at' => null,
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn () => [
            'stage' => ApplicationStage::Rejected->value,
            'hired_at' => null,
            'rejected_at' => now()
        ]);
    }
}
