<div class="modal" id="createPaisModal" tabindex="-1"> <!-- ID1 deletePhoneModal -->
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Pais</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" id="code" maxlength="3" placeholder="Código del pais"/>
        <input type="text" id="name" maxlength="100" placeholder="Nombre del pais"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" id="btCrearPais" class="btn btn-primary">Crear pais</button>
      </div>
    </div>
  </div>
</div>
<script>
/* global fetch */
  let btCrearPais = document.getElementById('btCrearPais');
  let csrf = document.querySelector('meta[name="csrf-token"]')['content'];
  let code = document.getElementById('code');
  let name = document.getElementById('name');
  let url = document.querySelector('meta[name="url-base"]')['content'];
  btCrearPais.onclick = function() {
    let data = {
       code: code.value,
       name: name.value,
    };
    //Es el momento de validar en javascript
    llamadaAjax(data);
  };
  
  function llamadaAjax(data) {
    fetch(url + '/pais', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error("Error:", error));
  }
  
</script>