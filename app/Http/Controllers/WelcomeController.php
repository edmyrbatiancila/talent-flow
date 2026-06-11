<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobOpeningResource;
use App\Queries\JobOpeningQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(JobOpeningQuery $query): Response
    {
        return Inertia::render('welcome', [
            'jobOpenings' => JobOpeningResource::collection($query->openForWelcome())
        ]);
    }
}
