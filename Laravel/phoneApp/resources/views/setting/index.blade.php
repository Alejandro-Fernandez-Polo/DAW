@extends('app.base')
@section('title', 'Setting')

@section('content')

<form action="{{ url('setting')}}" method="post">
    
    @method('put')
    @csrf
    
    <div>
        behaviour after inserting new phone forma 1
    </div>
    
    <input class="form-check-input" type="radio" id="showPhone" name="afterInsert" value="show phones" @if(session('afterInsert', 'show phones') == 'show phones') checked @endif/>
    <label class="form-check-label" for="showPhone">
       Show all phones list
    </label>
    <br>
    <input class="form-check-input" type="radio" id="createPhone" name="afterInsert" value="show create from" @if(session('afterInsert', 'show phones') == 'show create from') checked @endif/>
    <label class="form-check-label" for="createPhone">
       Show create new phone from
    </label>
    <br>
    <br>
    <label for="afterEdit" >Behaviour after editing new phone</label>
    <select name="afterEdit" id="afterEdit" class="form-select" aria-label="Default select example">
        @foreach ($afterEditOptions as $value => $label)
            <option value="{{ $value }}" {{ $selectedEditOption == $value ? 'selected' : '' }}>{{ $label }}</option>
        @endforeach
    </select>
    <br>
    <button type="submit" class="btn btn-primary">Save Setting</button>
    
</form>

@endsection
