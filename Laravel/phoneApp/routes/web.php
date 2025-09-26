<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PhoneController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\DiskController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\PaginateArtistController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::resource('phone', PhoneController::class);
Route::resource('artist', ArtistController::class);
Route::resource('paginateArtist', PaginateArtistController::class);
Route::get('paginateArtist2', [PaginateArtistController::class, 'index2'])-> name('paginateArtist.index2');
Route::get('disk/view/file/fotosubida.jpg', [DiskController::class, 'view'])-> name('disk.view');
Route::resource('disk', DiskController::class);
Route::get('disk/create/{idartist}',[DiskController::class, 'createArtist'])-> name('disk.create.artist');
Route::get('phone/view/{ide}',[PhoneController::class, 'view'])-> name('phone.view');

Route::get('setting',[SettingController::class, 'index'])-> name('setting.index');
Route::get('setting/showSelect',[SettingController::class, 'showSelect'])-> name('setting.showSelect');
Route::put('setting',[SettingController::class, 'update'])-> name('setting.update');

Route::get('pais',[PaisController::class, 'index'])-> name('pais.index');