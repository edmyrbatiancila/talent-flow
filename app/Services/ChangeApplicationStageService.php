<?php

namespace App\Services;

use App\Enums\ApplicationStage;
use App\Models\Application;

class ChangeApplicationStageService
{
    public function handle(Application $application, ApplicationStage $stage): Application
    {
        $application->stage = $stage;
        $application->hired_at = $stage === ApplicationStage::Hired ? now() : null;
        $application->rejected_at = $stage === ApplicationStage::Rejected ? now() : null;
        $application->save();

        return $application;
    }
}
