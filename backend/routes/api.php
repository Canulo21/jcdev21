<?php

use App\Http\Controllers\CertficationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/certifications', [CertficationController::class, 'index']);
