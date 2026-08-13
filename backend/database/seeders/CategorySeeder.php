<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_categories = [
            [
                'id' => '1',
                'name' => 'Full Stack'
                
                
            ],
            [
                'id' => '2',
                'name' => 'WordPress'
                
            ],
            [
                'id' => '3',
                'name' => 'Frontend'
                
            ],
        ];
        Category::insert($data_categories);
    }
}
