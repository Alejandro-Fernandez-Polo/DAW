@extends('app.base')
@section('title', 'Setting')

@section('content')

<!-- crear 3 selects -->
<select required name="pais" id="pais" class="form-select">
    <option value="&nbsp;" hidden>Selecciona el país</option>
    @foreach ($paises as $value => $label)
        <option value="{{ $value }}" {{ $pais == $value ? 'selected' : ''}}>{{ $label }}</option>
    @endforeach
</select>
<br>
<select required name="provincia" id="provincia" class="form-select">
    <option value="&nbsp;" disabled {{ $provincia == '' ? 'selected' : ''}}>Selecciona provincia</option>
    @foreach ($provincias as $value => $label)
        <option value="{{ $value }}" {{ $provincia == $value ? 'selected' : ''}}>{{ $label }}</option>
    @endforeach
</select>
<br>
<select required name="country" id="country" class="form-select">
     <option value="&nbsp;" disabled {{ $SelectedCountry == '' ? 'selected' : ''}}>Select the country</option>
    @foreach ($countries as $country)
        <option value="{{ $country->Code }}" {{ $SelectedCountry == $country->Code ? 'selected' : ''}}>{{ $country->Name }}</option>
    @endforeach
</select>
<br>
<select required name="country" id="countryv2" class="form-select">
     <option value="&nbsp;" disabled {{ $SelectedCountry == '' ? 'selected' : ''}}>Select the country</option>
    @foreach ($countries as $country)
        <option value="{{ $country->Code }}" {{ $SelectedCountry == $country->Code ? 'selected' : ''}}>{{ $country->Name }}</option>
    @endforeach
</select>

@endsection
