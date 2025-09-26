<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use Illuminate\Http\Request;

class PhoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $phones = Phone::all();//eloquent
        return view('phone.index', ['phones' => $phones]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        return view('phone.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        // 1º generar el objeto
        //$object = new Phone($request ->all());
        
        // 2º intentar guardar
        try{
            $phone = Phone::create($request ->all());
            // 3º si lo he guardado volver a 'algun sitio': index, create
            $afterInsert = session('afterInsert', 'show phones');
            $target = 'phone';
            if($afterInsert != 'show phones'){
                $target = 'phone/create';
            }
            return redirect($target) -> with(['message' => 'The phone has been saved.']);
        } catch(\Exception $e) {
             // 4º si no lo he guardado volver a la página anterior con sus datos para volver a rellenar el formulario
            return back() ->withInput() -> withErrors(['message' => 'The phone has not been saved.']);
        }
    }
    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function show(Phone $phone) {
        return view('phone.show', ['phone' => $phone]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function edit(Phone $phone) {
        return view('phone.edit', ['phone' => $phone]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Phone $phone) {
        try{
            $result = $phone->update($request->all());
            //opcion2
            // $movie ->fill($request->all());
            // $result = $movie->save();
            // 3º si lo he guardado volver a 'algun sitio': index, create
            $afterEdit = session('afterEdit', 'phone');
            //edit/movie/show
            if($afterEdit == 'phone'){
                $target = 'phone';
            }else if ($afterEdit == 'edit') {
                $target = 'phone/' . $phone->id . '/edit';
            }else {
                $target = 'phone/' . $phone->id;
            }
            return redirect($target) -> with(['message' => 'The phone has been updated.']);
        } catch(\Exception $e) {
            return back() ->withInput() -> withErrors(['message' => 'The phone has not been updated.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Phone  $phone
     * @return \Illuminate\Http\Response
     */
    public function destroy(Phone $phone) {
        try {
            $phone->delete();
            return redirect('phone')->with(['message' => 'The phone has been deleted.']);
        } catch(\Exception $e) {
            return back()->withErrors(['message' => 'The phone has not been deleted.']);
        }
    }
    
    function view(Request $request, $id) {
        $phone = Phone::find($id);
        if($movie == null) {
            return abort(404);
        }
        dd($movie, $id);
    }
}
