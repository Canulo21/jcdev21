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
                'github_url' => '#',
                'live_url' => 'https://msvvs.dk/',
                'category_id' => 2,
            ],
        ];
        Project::insert($data_projects);
    }
}
