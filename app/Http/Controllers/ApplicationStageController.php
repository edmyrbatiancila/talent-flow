<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStage;
use App\Http\Requests\UpdateApplicationStageRequest;
use App\Models\Application;
use App\Services\ChangeApplicationStageService;
use Illuminate\Http\RedirectResponse;

class ApplicationStageController extends Controller
{
    public function update(
        UpdateApplicationStageRequest $request,
        Application $application,
        ChangeApplicationStageService $service
    ): RedirectResponse {
        $service->handle(
            $application,
            ApplicationStage::from($request->validated('stage'))
        );

        return back();
    }
}
