<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('items', function (Blueprint $table) {
        $table->id();
        $table->string('code')->unique(); // Código único o de barras del recurso
        $table->string('title'); // Título del libro o nombre del equipo
        $table->string('category'); // Ej: Bibliográfico, Cómputo, Laboratorio
        $table->text('description')->nullable();
        $table->enum('status', ['Disponible', 'En Préstamo', 'En Mantenimiento', 'Dado de Baja'])->default('Disponible');
        $table->string('location')->nullable(); // Ej: Estante A-3, Laboratorio 2
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
