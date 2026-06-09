<?php

namespace App\Enums;

enum ApplicationStage: string
{
    case Applied = 'applied';
    case Screening = 'screening';
    case Interview = 'interview';
    case Assessment = 'assessment';
    case Offer = 'offer';
    case Hired = 'hired';
    case Rejected = 'rejected';
}
