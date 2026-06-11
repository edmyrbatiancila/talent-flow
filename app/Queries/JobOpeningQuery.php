<?php

namespace App\Queries;

use App\Models\JobOpening;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class JobOpeningQuery
{
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        return JobOpening::query()
            ->with('user:id,name')
            ->when($filters['search'] ?? null, fn (Builder $query, string $search) => $this->search($query, $search))
            ->when($filters['status'] ?? null, fn (Builder $query, string $status) => $query->where('status', $status))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    private function search(Builder $query, string $search): void
    {
        $query->where(function (Builder $query) use ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('department', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%");
        });
    }
}
