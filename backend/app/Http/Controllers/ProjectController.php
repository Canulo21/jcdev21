<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //testers
    public function index()
    {
        $projects = Project::with(['tags', 'categories'])->get();

        return response()->json($projects);
    }
}
