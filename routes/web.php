<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ApplicationStageController;
use App\Http\Controllers\JobOpeningController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // ========== Job Openings Routes ==========
    Route::resource('job-openings', JobOpeningController::class);
    Route::resource('applicants', ApplicantController::class);

    Route::patch('applications/{application}/stage', [ApplicationStageController::class, 'update'])
        ->name('applications.stage.update');

});

require __DIR__.'/settings.php';
