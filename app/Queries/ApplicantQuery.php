<?php

namespace App\Queries;

use App\Models\Applicant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class ApplicantQuery
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return Applicant::query()
            ->with(['applications.jobOpening:id,title,department,status'])
            ->when($filters['search'] ?? null, fn (Builder $query, string $search) => $this->search($query, $search))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    private function search(Builder $query, string $search): void
    {
        $query->where(function (Builder $query) use ($search) {
            $query->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }
}