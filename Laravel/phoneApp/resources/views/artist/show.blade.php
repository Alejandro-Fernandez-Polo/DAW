@extends('app.base')
@section('title', 'Phone Show')

@section('content')

<div class="table-responsive small">
    <table class="table table-striped table-sm">
        <tbody>
            <tr>
                <td>#</td>
                <td>{{ $artist ->id }}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{{ $artist ->name }}</td>
            </tr>
            @foreach($artist->disks as $disk)
                <tr>
                    <td>Disk</td>
                    <td>{{ $disk ->title }}</td>
                </tr>
            @endforeach
            <tr>
                <td>Add disk</td>
                <td>
                    <a class="btn btn-primary" href="{{ url('disk/create?idartist=' . $artist->id) }}">add</a>
                </td>
            </tr>
            <tr>
                <td>Add disk</td>
                <td>
                    <a class="btn btn-primary" href="{{ url('disk/create/' . $artist->id) }}">add</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
@endsection