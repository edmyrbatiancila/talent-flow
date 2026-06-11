<?php

namespace App\Models;

use App\Enums\ApplicationStage;
use Database\Factories\ApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'applicant_id',
    'job_opening_id',
    'stage',
    'applied_at',
    'hired_at',
    'rejected_at',
])]

class Application extends Model
{
    /** @use HasFactory<ApplicationFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'stage' => ApplicationStage::class,
            'applied_at' => 'datetime',
            'hired_at' => 'datetime',
            'rejected_at' => 'datetime',
        ];
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class);
    }

    public function jobOpening(): BelongsTo
    {
        return $this->belongsTo(JobOpening::class);
    }

    public function isHired(): bool
    {
        return $this->stage === ApplicationStage::Hired;
    }

    public function isRejected(): bool
    {
        return $this->stage === ApplicationStage::Rejected;
    }
}
