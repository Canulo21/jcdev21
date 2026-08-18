<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['company_id', 'position', 'duration', 'description'])]
class CompanyExperience extends Model
{
    //
    public function companies()
    {
        return $this->belongsTo(Company::class);
    }
}