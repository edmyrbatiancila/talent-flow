<?php

use App\Enums\ApplicationStage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('applicant_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('job_opening_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('stage')
                ->default(ApplicationStage::Applied->value);

            $table->timestamp('applied_at')->useCurrent();
            $table->timestamp('hired_at')->nullable();
            $table->timestamp('rejected_at')->nullable();

            $table->timestamps();

            $table->unique([
                'applicant_id',
                'job_opening_id',
            ]);

            $table->index([
                'stage',
                'applied_at',
            ]);

            $table->index('job_opening_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
