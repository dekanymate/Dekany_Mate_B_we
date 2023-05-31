<?php

namespace App\Http\Controllers;
use App\Models\Szavak;
use Illuminate\Http\Request;

class SzavakController extends Controller
{
    public function index(){
        $szavaks =  Szavak::all();
        return $szavaks;
    }
}

