<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    //
    public function index()
    {
        $projects = Project::with(['tags', 'category']) 
            ->latest()
            ->get();

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

            // Tags
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',

            // Image
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Get tags before creating the project
        $tags = $validated['tags'] ?? [];

        // Remove tags because tags isn't a column in projects
        unset($validated['tags']);

        // Store image
        $imagePath = $request->file('image')->store('projects', 'public');

        $validated['image'] = $imagePath;

        // Create project
        $project = Project::create($validated);

        // Attach tags to project_tags
        $project->tags()->attach($tags);

        // Include tags in response
        $project->load('tags');

        return response()->json([
            'message' => 'Project added successfully',
            'project' => $project,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'live_url' => 'nullable|string|max:255',

            // Tags
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',

            // Image
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // Get tags
        $tags = $validated['tags'] ?? [];

        // Remove tags because tags isn't a column in projects
        unset($validated['tags']);

        // Update image only if a new image was uploaded
        if ($request->hasFile('image')) {

            // Delete old image
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('projects', 'public');

            $validated['image'] = $imagePath;
        }

        // Update project
        $project->update($validated);

        // Update tags
        $project->tags()->sync($tags);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project->fresh(),
        ], 200);
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
