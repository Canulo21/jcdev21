<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //
    public function index()
    {
        $projects = Project::with(['tags', 'category'])->get();

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'live_url' => 'nullable|string|max:255',
        ]);

        $imagePath = $request->file('image')->store('projects', 'public');

        $validated['image'] = $imagePath;

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project added successfully',
            'project' => $project,
        ], 201);
    }

    public function destroy($id)
    {   
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully.'
        ]);
    }

}
