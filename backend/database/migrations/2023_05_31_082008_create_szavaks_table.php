<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Szavak;
use App\Models\Tema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('szavaks', function (Blueprint $table) {
            $table->id();
            $table->string('angol');
            $table->string('magyar');
            $table->foreignId('temaId')->references('id')->on('temas');
            $table->timestamps(false);
        });

        Szavak::create(['angol'=>"ball", 'magyar'=>'labda', 'temaId'=>1]);
        Szavak::create(['angol'=>"health", 'magyar'=>'egészség', 'temaId'=>1]);
        Szavak::create(['angol'=>"body", 'magyar'=>'test', 'temaId'=>1]);
        Szavak::create(['angol'=>"code", 'magyar'=>'tanár', 'temaId'=>2]);
        Szavak::create(['angol'=>"character", 'magyar'=>'karakter', 'temaId'=>2]);
        Szavak::create(['angol'=>"source", 'magyar'=>'forrás', 'temaId'=>2]);
        Szavak::create(['angol'=>"teacher", 'magyar'=>'tanár', 'temaId'=>3]);
        Szavak::create(['angol'=>"book", 'magyar'=>'könyv', 'temaId'=>3]);
        Szavak::create(['angol'=>"calculator", 'magyar'=>'számológép', 'temaId'=>3]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szavaks');
    }
};
