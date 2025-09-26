<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disk', function (Blueprint $table) {
            $table->id();
            //definir el campo que hace de clave foránea
            $table->foreignId('idartist');
            $table->string('title', 60);
            $table->integer('year')->nullable();
            $table->binary('cover')->nullable();
            $table->timestamps();
            //definir la clave foránea
            $table->foreign('idartist')->references('id')->on('artist');
            $table->unique(['idartist', 'title']);
        });
        $sql = 'alter table disk change cover cover longblob';
        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('disk');
    }
};
