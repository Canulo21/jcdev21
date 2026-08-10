<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data_certificates = [
            [
                'title' => 'Build a Full Website using WordPRess',
                'provider' => 'coursera',
                'completed' => 'March 21, 2025',
                'cred_id' => 'HUIWO1O0IWBH',
                'url' => "https://www.coursera.org/account/accomplishments/certificate/HUIWO1O0IWBH",
            ],
            [
                'title' => 'Build a free website with WordPress',
                'provider' => 'coursera',
                'completed' => 'March 21, 2025',
                'cred_id' => '2MWPPLV52AJM',
                'url' => "https://www.coursera.org/account/accomplishments/certificate/2MWPPLV52AJM",
            ],
            [
                'title' => 'Responsive Web Design',
                'provider' => 'freeCodeCamp',
                'completed' => 'September 3, 2024',
                'cred_id' => 'fcc566e0508-11e0-4807-8f53-e278475f4367',
                'url' => "https://www.freecodecamp.org/certification/fcc566e0508-11e0-4807-8f53-e278475f4367/responsive-web-design",
            ],           
        ];
        Certification::insert($data_certificates);
    }
}
