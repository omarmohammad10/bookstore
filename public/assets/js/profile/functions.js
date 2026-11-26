function isError(alert) {
  if (alert != null) {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: alert[0],
      title: alert[1]
    });
  }
}

function imgPath(imgName) {
  return window.location.origin + "/PHP/bookstore/public/assets/images/" + imgName;
}

function showErrors(errors) {
  for (let error in errors) {
    $(`p.alert[data-error-name="${error}"]`).text(errors[error]).removeClass("d-none");
  }
}

function openModal(modalId) {
  const myModal = new bootstrap.Modal(`#${modalId}`);
  myModal.show();
  document.activeElement?.blur();
}

function bookComponent(book, status) {
  let shortDesc = book['description'].slice(0, 100);
  let additionalRows = "";

  if (status == 'books') {
    additionalRows = `
    <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Stock : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p>${book['stock']}</p>
              </div>
            </div>
            <div class='input-group'>
                <input type='number' min='1' class='form-control' placeholder='Quantity' id='input_quantity_${book['id']}'>
                <button class='btn btn-outline-success' type='button' onclick='addToCart(${book['id']},this)'>Add To Cart</button>
          </div>
    </div>
    `;
  } else if (status == 'cart') {
    additionalRows = `
    <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Subtotal : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p class="subtotal">${book['subtotal']}</p>
              </div>
            </div>
            <div class="input-group mb-3 m-auto text-center">
              <button class="btn btn-outline-danger" type="button" id="button-addon1" onclick="decreaseOrderItem(${book['order_item_id']},this)"><i class="fa-solid fa-minus" ></i></button>
              <input type="text" class="form-control text-center" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="${book['quantity']}" disabled>
              <button class="btn btn-outline-success" type="button" id="button-addon1" onclick="increaseOrderItem(${book['order_item_id']},this)"><i class="fa-solid fa-plus"></i></button>
            </div>
    </div>
    `;
  } else if (status == 'showOrder') {
    additionalRows = `
    <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Subtotal : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p class="subtotal">${book['subtotal']}</p>
              </div>
            </div>
    </div>
    `;
  }

  return `
           <div class='col-lg-4 mb-3'>
    <div class='item'>
      <div class='card py-2 px-3 rounded-4 bg-primary-subtle text-primary-emphasis position-relative' data-book-id="${book['book_id']}">
      ${(status == 'cart') ? `<i class="fa-solid fa-trash-can position-absolute text-danger" style="top:15px; right:15px" onclick="deleteOrderItem(${book['order_item_id']},this)"></i>` : ``}
        <img src='${imgPath(book.image == null ? 'book.png' : `uploads/${book.image}`)}'
          class='card-img-top m-auto d-block'
          style='width:100px'>
        <div class='card-body'>
          <h5 class='card-title mb-3 text-center'>${book['title']}</h5>
          <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Author : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p>${book['author_name']}</p>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Description : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p>${shortDesc}...</p>
              </div>
            </div>
          </div>
          <div class='row'>
            <div class='col-4'>
              <div class='item'>
                <h6>Price : </h6>
              </div>
            </div>
            <div class='col-8'>
              <div class='item'>
                <p>${book['price']}</p>
              </div>
            </div>
          </div>
          ${additionalRows}
        </div>
      </div>
    </div>
  </div>  
  `;
}