<?php

namespace App\Models;

use App\Enums\EmploymentType;
use App\Enums\JobOpeningStatus;
use Database\Factories\JobOpeningFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'user_id',
    'title',
    'department',
    'employment_type',
    'location',
    'salary_min',
    'salary_max',
    'description',
    'status',
    'archived_at',
])]

class JobOpening extends Model
{
    /** @use HasFactory<JobOpeningFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'employment_type' => EmploymentType::class,
            'status' => JobOpeningStatus::class,
            'salary_min' => 'integer',
            'salary_max' => 'integer',
            'archived_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isArchived(): bool
    {
        return $this->status === JobOpeningStatus::Archived;
    }

    public function isOpen(): bool
    {
        return $this->status === JobOpeningStatus::Open;
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
