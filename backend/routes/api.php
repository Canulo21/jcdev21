<?php

use App\Http\Controllers\CertficationController;
use App\Http\Controllers\CompanyController;
use Illuminate\Support\Facades\Route;

Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/certifications', [CertficationController::class, 'index']);
