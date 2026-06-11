<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'stage' => $this->stage?->value,
            'applied_at' => $this->applied_at,
            'hired_at' => $this->hired_at,
            'rejected_at' => $this->rejected_at,
            'job_opening' => new JobOpeningResource($this->whenLoaded('jobOpening')),
            'applicant' => new ApplicantResource($this->whenLoaded('applicant')),
        ];
    }
}
