<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'description', 'image', 'github_url', 'live_url'])]
class Project extends Model
{
    //
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'project_tags');
    }

    public function categories()
    {
        return $this->belongsTo(Category::class, 'project_categories');
    }
}
