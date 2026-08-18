<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_projects = [
            [
                'title' => 'Praksish',
                'description' => 'Alabang, Montinlupa City, Philippines',
                'image' => '',
                'github_url' => '#',
                'live_url' => 'https://praksish.dk/',
                'category_id' => 1,
            ],
            [
                'title' => 'Msvvs',
                'description' => 'Don Anselmo Bernad Avenue, Ozamiz',
                'image' => '',
                'github_url' => '',
                'live_url' => 'https://msvvs.dk/',
                'category_id' => 2,
            ],
            [
                'title' => 'Positivus',
                'description' => 'This is only a practice website where i transform a figma design to functional website.',
                'image' => '',
                'github_url' => 'https://github.com/Canulo21/positivus',
                'live_url' => 'https://positivus-jc.vercel.app/',
                'category_id' => 3,
            ],
        ];
        Project::insert($data_projects);
    }
}
