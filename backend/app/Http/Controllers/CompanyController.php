<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyExperience;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    //
    public function index()
    {
        $companies = Company::select([
        'id',
        'company_name',
        'company_addresse',
        'company_website',
    ])
    ->with([
        'experiences' => function ($query) {
            $query->select([
                'id',
                'company_id',
                'position',
                'duration',
                'description',
            ]);
        }
    ])
    ->latest()
    ->get();

        return response()->json($companies);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_addresse' => 'nullable|string|max:255',
            'company_website' => 'nullable|string|max:255',

            'experiences' => 'required|array',
            'experiences.*.position' => 'required|string|max:255',
            'experiences.*.duration' => 'required|string|max:255',
            'experiences.*.description' => 'nullable|string',
        ]);

        $company = Company::create([
            'company_name' => $validated['company_name'],
            'company_addresse' => $validated['company_addresse'] ?? null,
            'company_website' => $validated['company_website'] ?? null,
        ]);

        foreach ($validated['experiences'] as $experience) {
            $company->experiences()->create([
                'position' => $experience['position'],
                'duration' => $experience['duration'],
                'description' => $experience['description'] ?? null,
            ]);
        }

        return response()->json([
            'message' => 'Company created successfully',
            'company' => $company->load('experiences'),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_addresse' => 'nullable|string|max:255',
            'company_website' => 'nullable|string|max:255',

            'experiences' => 'required|array',
            'experiences.*.id' => 'nullable|integer',
            'experiences.*.position' => 'required|string|max:255',
            'experiences.*.duration' => 'required|string|max:255',
            'experiences.*.description' => 'nullable|string',
        ]);

        $company->update([
            'company_name' => $validated['company_name'],
            'company_addresse' => $validated['company_addresse'] ?? null,
            'company_website' => $validated['company_website'] ?? null,
        ]);

        $experienceIds = [];

        foreach ($validated['experiences'] as $experience) {

            if (!empty($experience['id'])) {

                $companyExperience = CompanyExperience::findOrFail(
                    $experience['id']
                );

                $companyExperience->update([
                    'position' => $experience['position'],
                    'duration' => $experience['duration'],
                    'description' => $experience['description'] ?? null,
                ]);

                $experienceIds[] = $companyExperience->id;

            } else {

                $companyExperience = $company->experiences()->create([
                    'position' => $experience['position'],
                    'duration' => $experience['duration'],
                    'description' => $experience['description'] ?? null,
                ]);

                $experienceIds[] = $companyExperience->id;
            }
        }

        // Delete experiences removed from the edit form
        $company->experiences()
            ->whereNotIn('id', $experienceIds)
            ->delete();

        return response()->json([
            'message' => 'Company updated successfully',
            'company' => $company->load('experiences'),
        ], 200);
    }

    public function destroy($id)
    {   
        $company = Company::findOrFail($id);

        $company->delete();

        return response()->json([
            'message' => 'Experience deleted successfully.'
        ]);
    }
}
