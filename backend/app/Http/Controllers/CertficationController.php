<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;

class CertficationController extends Controller
{
    //Tester 21
    
    public function index()
    {
        $certificates = Certification::get();

        return response()->json($certificates);
    }
}
