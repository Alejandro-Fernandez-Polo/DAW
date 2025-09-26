<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller {
    
    function main() {
        return view('main');
    }
}
