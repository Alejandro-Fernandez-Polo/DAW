@extends('app.base')

@section('title', 'Argo Artist Paginate List')

@section('content')

<div class="d-flex">
  <form>
    <input type="hidden" value="{{$orderBy}}" name="orderBy">
    <input type="hidden" value="{{$orderType}}" name="orderType">
    <input type="hidden" value="{{$q}}" name="q">
    <select name="rowsPerPage" id="">
      @foreach($rpps as $index => $value)
        <option value="{{$index}}" @if($rpp == $index) selected @endif>{{$index}}</option>
      @endforeach
    </select>
    <button type="submit">view</button>
  </form>
  <from class="mx-3">
        <input type="hidden" value="{{$orderBy}}" name="orderBy">
    <input type="hidden" value="{{$orderType}}" name="orderType">
    <input type="hidden" value="{{$rpp}}" name="rowsPerPage">
    <input type="hidden" value="{{$q}}" name="q">
    <input type="search" name="q" placeholder="search" />
  </from>
</div>
<div class="table-responsive small">
    <table class="table table-striped table-sm">
      <thead>
            <tr>
                <th scope="col">#
                    <a href="?rowsPerPage={{$rpp}}&orderBy=id&orderType=asc"><i class="material-icons opacity-10">arrow_upward</i></a>
                    <a href="?rowsPerPage={{$rpp}}&orderBy=id&orderType=desc"><i class="material-icons opacity-10">arrow_downward</i></a>
                </th>
                <th scope="col">name
                <a href="?rowsPerPage={{$rpp}}&orderBy=name&orderType=asc"><i class="material-icons opacity-10">arrow_upward</i></a>
                    <a href="?rowsPerPage={{$rpp}}&orderBy=name&orderType=desc"><i class="material-icons opacity-10">arrow_downward</i></a>
                    </th>
                <th scope="col">argo
                <a href="?rowsPerPage={{$rpp}}&orderBy=idargo&orderType=asc"><i class="material-icons opacity-10">arrow_upward</i></a>
                    <a href="?rowsPerPage={{$rpp}}&orderBy=idargo&orderType=desc"><i class="material-icons opacity-10">arrow_downward</i></a>
                    </th>
                <th scope="col">oltro
                    <a href="?rowsPerPage={{$rpp}}&orderBy=idoltro&orderType=asc"><i class="material-icons opacity-10">arrow_upward</i></a>
                    <a href="?rowsPerPage={{$rpp}}&orderBy=idoltro&orderType=desc"><i class="material-icons opacity-10">arrow_downward</i></a>
                </th>
            </tr>
      </thead>
      <tbody>
        @foreach($artists as $artist)
            <tr>
                <td>{{ $artist->id }}</td>
                <td>
                  {{ $artist->name }}
                </td>
                <td>
                    {{ $artist ->idargo }}
                    {{ $artist ->argo->name }}
                </td>
                <td>
                    {{ $artist ->idoltro }}
                </td>
                <td>
                  <a class="btn btn-primary" href="{{ url('artist/' . $artist->id) }}">show</a>
                </td>
            </tr>
        @endforeach
      </tbody>
    </table>
</div>
<div>
  {{ $artists->appends(['orderBy' => $orderBy, 'orderType' => $orderType, 'q' => $q,'rowsPerPage' => $rpp])->onEachSide(2)->links() }}
</div>
@endsection