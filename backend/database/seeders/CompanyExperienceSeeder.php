<?php

namespace Database\Seeders;

use App\Models\CompanyExperience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_experience = [
            [
                'company_id' => '1',
                'position' => 'Junior Web Developer',
                'duration' => '2021 - 2023',
                'description' =>  "tester1"
            ],
            [
                'company_id' => '1',
                'position' => 'Mid-Level Web Developer',
                'duration' => '2023 - Present',
                'description' =>  "tester2"
            ],
            [
                'company_id' => '2',
                'position' => 'Progmrammer',
                'duration' => '2021 - 2021',
                'description' =>  "tester1"
            ],
        ];
        CompanyExperience::insert($data_experience);
    }
}


