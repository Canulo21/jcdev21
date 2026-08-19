<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CertficationController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;


Route::post('/jc-login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/categories', [CategoryController::class, 'index']);

    Route::post('/add-project', [ProjectController::class, 'store']);
    Route::put('/projects/project-{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/project-{id}', [ProjectController::class, 'destroy']);

    Route::get('/tags', [TagController::class, 'index']);
    Route::put('/tags/tag-{id}', [TagController::class, 'update']);
    Route::post('/add-tag', [TagController::class, 'store']);
    Route::delete('/tags/tag-{id}', [TagController::class, 'destroy']);

    Route::post('/add-certificate', [CertficationController::class, 'store']);
    Route::put('/certificates/certificate-{id}', [CertficationController::class, 'update']);
    Route::delete('/certificates/certificate-{id}', [CertficationController::class, 'destroy']);

    Route::post('/add-experience', [CompanyController::class, 'store']);
    Route::put('/experiences/experience-{id}', [CompanyController::class, 'update']);
    Route::delete('/experiences/experiences-{id}', [CompanyController::class, 'destroy']);
});


Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/certifications', [CertficationController::class, 'index']);
