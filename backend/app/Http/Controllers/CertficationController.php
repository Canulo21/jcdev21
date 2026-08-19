<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertficationController extends Controller
{
    //Tester 21
    
    public function index()
    {
        $certificates = Certification::get();

        return response()->json($certificates);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'completed' => 'required|string|max:255',
            'cred_id' => 'required|string|max:255',
            'url' => 'required|string|max:255',
        ]);

        $imagePath = $request->file('image')->store('certifications', 'public');

        $validated['image'] = $imagePath;

        $certificate = Certification::create($validated);

        return response()->json([
            'message' => 'Tech stack added successfully',
            'certificate' => $certificate,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $certificate = Certification::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'provider' => 'required|string|max:255',
            'completed' => 'required|string|max:255',
            'cred_id' => 'required|string|max:255',
            'url' => 'required|string|max:255',

            // Image
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {

            // Delete old image
            if ($certificate->image) {
                Storage::disk('public')->delete($certificate->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('certifications', 'public');

            $validated['image'] = $imagePath;
        }

        $certificate->update($validated);

        return response()->json([
            'message' => 'Certificate updated successfully',
            'certificate' => $certificate->fresh(),
        ], 200);
    }

    public function destroy($id)
    {   
        $certificate = Certification::findOrFail($id);

        if ($certificate->image) {
            Storage::disk('public')->delete($certificate->image);
        }

        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted successfully.'
        ]);
    }
}
