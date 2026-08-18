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
