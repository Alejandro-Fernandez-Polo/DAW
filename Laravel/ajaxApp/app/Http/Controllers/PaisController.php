<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Http\Request;

class PaisController extends Controller {
    
    function index() {
        $paises = Pais::all();
        //return response()->json($paises);
        return response()->json(['paises' => $paises]);
    }
    
    function store(Request $request){
        return response()->json(['result' => true]);
        //return response()->json(['result' => false]);
    }
}
