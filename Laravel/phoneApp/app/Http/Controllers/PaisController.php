<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PaisController extends Controller {
    
    function index() {
        //consultas en eloquent
        $paises1 = Pais::all();
        $paises2 = Pais::orderBy('name')->get();//base de datos
        //$paises3 = Pais::all()->sortBy('name');//en código       //NO USAR (tarda más)
        $paises3 = Pais::where('name', '>=', 't')->orderBy('name', 'desc')->take(10)->get();
        $pais = Pais::find('AGO');
        $pais = Pais::where('name', '>=', 't')->orderBy('name', 'desc')->first();
        //dd($pais);
        //dd([$paises1, $paises2]);
        
        //consultas en DB
        $paises0 = Pais::where('name', '>=', 't')->get();
        $paises1 = DB::select('select * from pais where name >= :name', ['name' => 't']);
        foreach($paises0 as $pais) {
            //echo $pais->name . ' ' . get_class($pais) . '<br>';
        }
        echo '<hr>';
        foreach($paises1 as $pais) {
            //echo $pais->name . ' ' . get_class($pais) . '<br>';
        }
        
        $paises2 = DB::table('pais')->get();
        //$pais1 = DB::table('pais')->find('AGO');
        $pais2 = DB::table('pais')->where('name', '>', 't')->first();
        
        $pdo = DB::connection()->getPdo();
        //sentencia preparada
        $sql = "select * from pais where code = :code";
        //preparo
        $sentencia = $pdo->prepare($sql);
        //asocio valores
        $sentencia->bindValue('code', 'AGO');
        //ejecuto sentencia
        $sentencia->execute();
        //cursor, $sentencia
        foreach($sentencia as $fila) {
            echo '<pre>' . var_export($fila, true) . '</pre>';
        }
        $sql = "select * from pais";
        $sentencia = $pdo->prepare($sql);
        //$sentencia->bindValue('code', 'AGO');
        $sentencia->execute();
        $paises = [];
        foreach($sentencia as $fila) {
            //echo '<pre>' . var_export($fila, true) . '</pre>';
            $pais = new Pais($fila);
            $paises[] = $pais;
        }
        //echo '<pre>' . var_export($paises, true) . '</pre>';
        dd($paises);
        
        //sentencia preparada
        $sql = "select * from pais where code < :cod3e";
        $sentencia = $pdo->prepare($sql);
        $sentencia->bindValue('code', 'AGO');
        $sentencia->execute();
        
        //sentencia no preparada
        $pais = "AGO' OR true OR code = '";
        $sql = "select * from pais where code < '$pais'";
        $sentencia = $pdo->prepare($sql); 
        
        
        
        $sentencia->execute();
    }
}
