<?php

namespace App\Http\Requests;

use App\Enums\ApplicationStage;
use App\Models\Applicant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListApplicantsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('viewAny', Applicant::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'stage' => ['nullable', Rule::enum(ApplicationStage::class)],
            'job_opening_id' => ['nullable', 'exists:job_openings,id'],
            'applied_from' => ['nullable', 'date'],
            'applied_until' => ['nullable', 'date', 'after_or_equal:applied_from'],
        ];
    }
}
