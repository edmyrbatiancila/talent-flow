<?php

namespace Database\Seeders;

use App\Models\JobOpening;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobOpeningSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobOpening::factory()
            ->count(20)
            ->open()
            ->create();

        JobOpening::factory()
            ->count(5)
            ->archived()
            ->create();
    }
}
