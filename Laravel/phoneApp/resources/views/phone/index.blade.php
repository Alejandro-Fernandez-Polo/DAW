@extends('app.base')
@section('title', 'Phone List')

@section('content')

@include('modal.deletephone')

<div class="table-responsive small">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Storage</th>
                <th scope="col">Weight</th>
                <th scope="col">Camera</th>
                <th scope="col">Batery</th>
                <th scope="col">Screen</th>
            </tr>
        </thead>
        <tbody>
            @foreach($phones as $phone)
                <tr>
                    <td>{{ $phone ->id }}</td>
                    <td>{{ $phone ->name }}</td>
                    <td>{{ $phone ->brand }}</td>
                    <td>{{ $phone ->storage }}</td>
                    <td>{{ $phone ->weight }}</td>
                    <td>{{ $phone ->camera }}</td>
                    <td>{{ $phone ->batery }}</td>
                    <td>{{ $phone ->screen }}</td>
                    <td>
                        <a class="btn-primary btn" href="{{ url('phone/' . $phone->id) }}">link to show</a>
                        <a class="btn-danger btn"  href="{{ url('phone/' . $phone->id . '/edit') }}">link to edit</a>
                    <form data-movie="{{ $phone-> title }}" class="formDelete" action="{{ url('phone/' . $phone->id) }}" method="post" style="display: inline-block">
                        @csrf
                        @method('delete')
                        <button type="submit" class="btn btn-warning">link to delete</button>
                    </form>
                    <a data-url="{{ url('phone/' . $phone->id) }}" class="btn-secondary btn hrefDelete" href="">link to delete v2</a>
                    <button data-url="{{ url('phone/' . $phone->id) }}" data-name="{{ $phone->name }}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deletePhoneModal">
                        Link to delete v3
                    </button>
                </td>
                </tr>
                @endforeach
        </tbody>
    </table>
    <a class="btn-info btn"  href="{{ url('phone/create') }}">link to create</a>
    <form id="formDeleteV2" action="{{ url('') }}" method="post" style="display: inline-block">
        @csrf
        @method('delete')
    </form>
</div>

<script>

    //solucion1
  const forms = document.querySelectorAll(".formDelete");
  forms.forEach(function(form) {
      form.onsubmit = (event) => {
          return confirm('Seguro que quieres borrar ' + event.target.dataset.movie + '?');
      };
  });
  
    //solucion2
  const ahrefs = document.querySelectorAll(".hrefDelete");
  const formDelete = document.getElementById('formDeleteV2');
  ahrefs.forEach(function(form) {
    form.onclick = (event) => {
        event.preventDefault();
            if (confirm('Seguro?')) {
                let url = event.target.dataset.url;
                formDelete.action = url;
                formDelete.submit();
            }
          //return confirm('Seguro?');
      };
  });
  
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

