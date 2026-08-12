<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //tester
        $data_tags = [
            [
                'id' => '1',
                'name' => 'Laravel'
                
                
            ],
            [
                'id' => '2',
                'name' => 'Javascript'
                
            ],
            [
                'id' => '3',
                'name' => 'Typescript'
                
            ],
            [
                'id' => '4',
                'name' => 'Tailwind'
                
            ],
            [
                'id' => '5',
                'name' => 'MySql'
                
            ],
            [
                'id' => '6',
                'name' => 'PHP'
                
            ],
            [
                'id' => '7',
                'name' => 'WordPress'
                
            ],
            [
                'id' => '8',
                'name' => 'CSS'
                
            ],
        ];
        Tag::insert($data_tags);
    }
}
