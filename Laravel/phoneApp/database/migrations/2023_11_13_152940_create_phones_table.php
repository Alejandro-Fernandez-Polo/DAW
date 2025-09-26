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
        Schema::create('phone', function (Blueprint $table) {
            $table->id();
            $table->string('name' , 120) ->unique();
            $table->string('brand' , 30);
            $table->integer('storage');
            $table->integer('weight') ->nullable();
            $table->string('camera' , 5)->nullable();
            $table->string('batery' , 9);
            $table->string('screen' , 4)->nullable();
            $table->timestamps(); //marcas de tiempo
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phones');
    }
};
