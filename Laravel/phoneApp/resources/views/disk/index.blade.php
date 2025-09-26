@extends('app.base')
@section('title', 'disk List')

@section('content')

<!--<hr/>-->
<!--<img src="{{ url('disk/view/file/fotosubida.jpg')}}">-->
<!--<hr/>-->

<div class="table-responsive small">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
                <th scope="col">idartist</th>
                <th scope="col">year</th>
                <th scope="col">coveer</th>
            </tr>
        </thead>
        <tbody>
            @foreach($disks as $disk)
                <tr>
                    <td>{{ $disk ->id }}</td>
                    <td>{{ $disk ->title }}</td>
                    <td>{{ $disk ->idartist }} {{ $disk->artist->name }}</td>
                    <td>{{ $disk ->year }}</td>
                    <td>
                        @if($disk->cover !=null)
                            <img src="data:image/jpeg;base64,{{ $disk->cover}}">
                        @endif
                    </td>
                @endforeach
        </tbody>
    </table>
    <a class="btn-info btn"  href="{{ url('disk/create') }}">link to create (nosense, anymore)</a>
</div>
@endsection

