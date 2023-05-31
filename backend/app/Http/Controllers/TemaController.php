<?php

namespace App\Http\Controllers;
use App\Models\Tema;
use Illuminate\Http\Request;

class TemaController extends Controller
{
    public function index(){
        $temas =  Tema::all();
        return $temas;
    }

    public function store(Request $request)
    {
        $Tema = new Tema();
        $Tema->temanev = $request->temanev;
        $Tema->save();
    }
}
