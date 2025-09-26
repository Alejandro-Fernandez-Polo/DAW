<div class="modal" id="deletePhoneModal" tabindex="-1"> <!-- ID1 deletePhoneModal -->
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete phone</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure that you want to delete the phone <span id="phoneName"></span>?</p> <!-- ID2 phoneName -->
      </div>
        <form id="formDeleteV3" action="{{ url('/') }}" method="post"> <!-- ID3 formDeleteV3 -->
            @csrf
            @method('delete')
        </form>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" form="formDeleteV3" class="btn btn-primary">Delete phone</button>
      </div>
    </div>
  </div>
</div>
