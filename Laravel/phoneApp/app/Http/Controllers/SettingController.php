<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;

class SettingController extends Controller{
    public function index() {
        //Parte superior sin select
        $checkedList = '';
        $checkedCreate = '';
        $afterInsert = session('afterInsert', 'show phones');
        if($afterInsert == 'show phones'){
            $checkedList = 'checked';
        }else {
            $checkedCreate = 'checked';
        }
        //Parte inferior con el select
        $afterEdit = session('afterEdit','phone');
        $afterEditOptions = [
            'edit' => 'Show edit phones list',
            'phone' => 'Show all phones list',
            'show' => 'Show phone'
            ];
        return view('setting.index', ['checkedList' => $checkedList, 'checkedCreate' => $checkedCreate, 'afterEditOptions' => $afterEditOptions, 'selectedEditOption' => $afterEdit]);
    }
    
    public function update(Request $request) {
        session(['afterInsert' => $request ->afterInsert, 'afterEdit' => $request ->afterEdit]);
        //dd($request);
        return redirect('phone') -> with(['message' => 'Settings has been updated.']);//back();
    }
    
    function showSelect() {
        $paises = [
            'albania' => 'Albania',
            'andorra' => 'Andorra',
            'austria' => 'Austria',
            'belgium' => 'Bélgica',
            'bosnia-and-herzegovina' => 'Bosnia y Herzegovina',
            'bulgaria' => 'Bulgaria',
            'croatia' => 'Croacia',
            'cyprus' => 'Chipre',
            'czech-republic' => 'República Checa',
            'denmark' => 'Dinamarca',
            'estonia' => 'Estonia',
            'finland' => 'Finlandia',
            'france' => 'Francia',
            'germany' => 'Alemania',
            'greece' => 'Grecia',
            'hungary' => 'Hungría',
            'iceland' => 'Islandia',
            'ireland' => 'Irlanda',
            'italy' => 'Italia',
            'latvia' => 'Letonia',
            'liechtenstein' => 'Liechtenstein',
            'lithuania' => 'Lituania',
            'luxembourg' => 'Luxemburgo',
            'macedonia' => 'Macedonia',
            'malta' => 'Malta',
            'moldova' => 'Moldavia',
            'monaco' => 'Mónaco',
            'montenegro' => 'Montenegro',
            'netherlands' => 'Países Bajos',
            'norway' => 'Noruega',
            'poland' => 'Polonia',
            'portugal' => 'Portugal',
            'romania' => 'Rumania',
            'russia' => 'Rusia',
            'san-marino' => 'San Marino',
            'serbia' => 'Serbia',
            'slovakia' => 'Eslovaquia',
            'slovenia' => 'Eslovenia',
            'spain' => 'España',
            'sweden' => 'Suecia',
            'switzerland' => 'Suiza',
            'ukraine' => 'Ucrania',
            'united-kingdom' => 'Reino Unido',
        ];
        
        $provincias = [
            'alava' => 'Álava',
            'albacete' => 'Albacete',
            'alicante' => 'Alicante',
            'almeria' => 'Almería',
            'avila' => 'Ávila',
            'badajoz' => 'Badajoz',
            'barcelona' => 'Barcelona',
            'burgos' => 'Burgos',
            'caceres' => 'Cáceres',
            'cadiz' => 'Cádiz',
            'castellon' => 'Castellón',
            'ciudad-real' => 'Ciudad Real',
            'cordoba' => 'Córdoba',
            'cuenca' => 'Cuenca',
            'gerona' => 'Gerona',
            'granada' => 'Granada',
            'guadalajara' => 'Guadalajara',
            'guipuzcoa' => 'Guipúzcoa',
            'huelva' => 'Huelva',
            'huesca' => 'Huesca',
            'jaen' => 'Jaén',
            'la-rioja' => 'La Rioja',
            'las-palmas' => 'Las Palmas',
            'leon' => 'León',
            'lerida' => 'Lérida',
            'lugo' => 'Lugo',
            'madrid' => 'Madrid',
            'malaga' => 'Málaga',
            'murcia' => 'Murcia',
            'navarra' => 'Navarra',
            'orense' => 'Orense',
            'palencia' => 'Palencia',
            'pontevedra' => 'Pontevedra',
            'salamanca' => 'Salamanca',
            'santa-cruz-de-tenerife' => 'Santa Cruz de Tenerife',
            'segovia' => 'Segovia',
            'sevilla' => 'Sevilla',
            'soria' => 'Soria',
            'tarragona' => 'Tarragona',
            'teruel' => 'Teruel',
            'toledo' => 'Toledo',
            'valencia' => 'Valencia',
            'valladolid' => 'Valladolid',
            'vizcaya' => 'Vizcaya',
            'zamora' => 'Zamora',
            'zaragoza' => 'Zaragoza',
        ];
        
        $countries = Pais::all();
        //dd($countries, $paises, $provincias);
        return view('setting.showSelect', ['countries' =>$countries, 'SelectedCountry' =>'DNK', 'paises' =>$paises, 'pais'=>'denmark' , 'provincias' =>$provincias, 'provincia' =>'alava']);
    }
}
