@extends('app.base')

@section('title', 'Disk Create')

@section('content')

<form action="{{ url('disk') }}" method="post" enctype="multipart/form-data">
    @csrf

    <!-- Inputs del formulario -->

    <div class="mb-3">
        <label for="title" class="form-label">Disk title</label>
        <input type="text" class="form-control" id="title" name="title" required value="{{ old('title') }}">
    </div>

    <div class="mb-3">
        <label for="idartist" class="form-label">Disk artist</label>
        <!--<input type="text" class="form-control" id="idartist" name="idartist" required value="{{ old('idartist') }}">-->
        <!--<select required name="idartist" id="countryv2" class="form-select">
            <option value="&nbsp;" disabled selected>Select the artist</option>
            @foreach ($artists as $value => $label)
                <option value="{{ $value }}" {{ $idartist == $value ? 'selected' : ''}}>{{ $label }}</option>
            @endforeach
        </select>-->
        <input type="hidden" name="idartist" value="{{ $idartist }}">
        <h1>{{ $artist->name }}</h1>
    </div>

    <div class="mb-3">
        <label for="year" class="form-label">Disk Year</label>
        <input type="number" class="form-control" id="year" name="year" step="1" min="1" max="9999" value="{{ old('year') }}">
    </div>
    
    <div class="mb-3">
        <label for="file" class="form-label">Cover</label>
        <input type="file" class="form-control" id="file" name="file">
    </div>
    


    <button type="submit" class="btn btn-success">Create</button>

</form>

@endsection