<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name'])]
class Tag extends Model
{
    //
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_tags');
    }
}
