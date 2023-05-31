<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\SzavakController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//TEMA 

Route::get('/temas', [TemaController::class, 'index']);
Route::post('/new-tema', [TemaController::class, 'store']);


//SZAVAK

Route::get('/szavaks', [SzavakController::class, 'index']);
