@extends('app.base')
@section('title', 'Phone Show')

@section('content')

@include('modal.deletephone')

<div class="table-responsive small">
    <table class="table table-striped table-sm">
        <tbody>
            <tr>
                <td>#</td>
                <td>{{ $phone ->id }}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{{ $phone ->name }}</td>
            </tr>
            <tr>
                <td>Brand</td>
                <td>{{ $phone ->brand }}</td>
            </tr>
            <tr>
                <td>Storage</td>
                <td>{{ $phone ->storage }}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>{{ $phone ->weight }}</td>
            </tr>
            <tr>
                <td>Camera</td>
                <td>{{ $phone ->camera }}</td>
            </tr>
            <tr>
                <td>Batery</td>
                <td>{{ $phone ->batery }}</td>
            </tr>
            <tr>
                <td>Screen</td>
                <td>{{ $phone ->screen }}</td>
            </tr>
        </tbody>
    </table>
    <a class="btn-danger btn"  href="{{ url('phone/' . $phone->id . '/edit') }}">link to edit</a>
    <button data-url="{{ url('phone/' . $phone->id) }}" data-name="{{ $phone->name }}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletePhoneModal">
            Link to delete v3
    </button>
</div>

<script>
  
    // //solucion3
     const deletePhoneModal = document.getElementById('deletePhoneModal');
     const phoneName = document.getElementById('phoneName');
     const fromDeleteV3 = document.getElementById('fromDeleteV3');
     deletePhoneModal.addEventListener('show.bs.modal', event => {
         console.log('show');
        //  alert(event.relatedTarget.dataset.name + '' + event.relatedTarget.dataset.url);
         phoneName.innerHTML = event.relatedTarget.dataset.name;
         formDeleteV3.action = event.relatedTarget.dataset.url;
     });
</script>
@endsection