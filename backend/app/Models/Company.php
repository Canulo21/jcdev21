<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['company_name', 'company_addresse', 'company_website'])]

class Company extends Model
{
    //
    public function experiences()
    {
        return $this->hasMany(CompanyExperience::class);
    }
}
