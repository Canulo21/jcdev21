<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $data_companies = [
            [
                'company_name' => '24 Creative Media Solutions inc.',
                'company_addresse' => 'Alabang, Muntinlupa City, Philippines',
                'company_website' => 'https://24cms.com/',
            ],
            [
                'company_name' => 'Benpos System',
                'company_addresse' => 'Don Anselmo Bernad Avenue, Ozamiz',
                'company_website' => 'https://www.benpossystems.com/main/',
            ],
        ];
        Company::insert($data_companies);

    }
}
