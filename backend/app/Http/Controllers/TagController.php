<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

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

    public function destroy($id)
    {   
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'message' => 'Tag deleted successfully.'
        ]);
    }
}
