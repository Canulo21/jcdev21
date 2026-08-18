<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_user = [
            [
                'name' => 'Jhon Carlo Canulo',
                'email' => 'canulodev21@gmail.com',
                'password' => Hash::make('canulo2121'),
            ],  
        ];
        User::insert($data_user);
    }
}
