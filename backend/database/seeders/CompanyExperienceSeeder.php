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
                'position' => 'Mid-Level Web Developer',
                'duration' => '2023 - Present',
                'description' => "Built dynamic websites using Advanced Custom Fields (ACF), custom post types, and custom taxonomies.\n Implemented basic SEO best practices (meta tags, schema, image optimization).\n Optimized website performance by improving Core Web Vitals, image loading, caching, and asset delivery.",
            ],
            [
                'company_id' => '1',
                'position' => 'Junior Web Developer',
                'duration' => '2021 - 2023',
                'description' => "Converted UI designs into fully responsive WordPress websites using HTML, CSS, JavaScript, jQuery, and PHP. \n Performed website maintenance, bug fixes, plugin updates, and content management.\n Resolved CSS, layout, and responsive design issues across desktop, tablet, and mobile devices.",
            ],
            [
                'company_id' => '2',
                'position' => 'Progmrammer',
                'duration' => '2021 - 2021',
                'description' =>  "Experienced in hardware installation, CCTV setup, RJ45 crimping, and basic network configuration. \n Maintained and enhanced legacy applications using C# and MySQL."
            ],
        ];
        CompanyExperience::insert($data_experience);
    }
}


