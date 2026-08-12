<?php

namespace Database\Seeders;

use App\Models\ProjectCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         $data_project_categories = [
            [
                'project_id' => '1',
                'category_id' => '1'
            ],
            [
                'project_id' => '2',
                'category_id' => '2'
            ],
        ];
        ProjectCategory::insert($data_project_categories);
    }
}
