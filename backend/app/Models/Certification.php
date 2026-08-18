<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;


#[Fillable(['title', 'provider', 'completed', 'cred_id', 'url', 'image'])]
class Certification extends Model
{
    //
}
