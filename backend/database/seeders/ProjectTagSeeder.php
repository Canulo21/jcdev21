<?php

namespace Database\Seeders;

use App\Models\ProjectTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_tags = [
            [
                'project_id' => '1',
                'tag_id' => '5'
            ],
            [
                'project_id' => '1',
                'tag_id' => '6'
            ],
            [
                'project_id' => '1',
                'tag_id' => '7'
            ],
            [
                'project_id' => '1',
                'tag_id' => '8'
            ],
            [
                'project_id' => '2',
                'tag_id' => '7'
            ],
            [
                'project_id' => '2',
                'tag_id' => '8'
            ],
            [
                'project_id' => '3',
                'tag_id' => '9'
            ],
            [
                'project_id' => '4',
                'tag_id' => '8'
            ],
            
        ];
        ProjectTag::insert($data_tags);
    }
}
