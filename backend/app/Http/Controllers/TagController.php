<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TagController extends Controller
{
    //
    public function index()
    {
        $tags = Tag::get();

        return response()->json($tags);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:tags,name',
        ]);

        $tag = Tag::create($validated);

        return response()->json([
            'message' => 'Tech stack added successfully',
            'tag' => $tag,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('tags', 'name')->ignore($tag->id),
            ],
        ]);

        $tag->update($validated);

        return response()->json([
            'message' => 'Tech stack updated successfully',
            'tag' => $tag->fresh(),
        ], 200);
    }

    public function destroy($id)
    {   
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'message' => 'Tag deleted successfully.'
        ]);
    }
}
