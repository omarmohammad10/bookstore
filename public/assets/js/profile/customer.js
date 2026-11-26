function addToCart(bookId, that) {
  let $quantityInput = $(that).prev(),
    // Get the input next to (add to cart) button
    quantity = Number($quantityInput.val()); // Quantity Value

  if (quantity == 0) {
    return;
  }

  let dataForm = {
    bookId: bookId,
    quantity: quantity
  };

  $.ajax({
    url: "profile/addToCart",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);
      let totalItems = response.data.totalItems;
      $("#TotalItems").text(totalItems);
      $quantityInput.val("");
    },
    error: function (response) {
      console.log(response);
      if (response.status == 422) {
        let errorMsg = response.responseJSON.data.bookId[0];
        isError(['error', errorMsg]);
      }
    }
  })
}

function getCartItems(orderId = null, status = 'cart') {
  let dataForm = {};
  if(orderId != null){
    dataForm['orderId'] = orderId;
  }
  console.log(dataForm);

  $.ajax({
    url: "profile/getCartItems",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);
      let books = response.data;

      if (books.length == 0) {
        $(`#Cart .modal-body`).html(`
            <p class="alert alert-warning text-center w-75 m-auto">Your cart is empty</p>
         `);
      } else {
        $(`#Cart .modal-body`).html(`
        <h5 class="text-center mb-4">Total Order Price : <span class="text-success fw-bolder" id="CartTotalPrice">${books[0].total_price}</span></h5>
        <div class="row"></div>
        ${(status == 'cart') ? `<button class="btn btn-success w-100" onclick="fireOrder(${books[0]['order_id']})">Order Now</button>` : ``}
        `);

        for (let book of books) {
          $(`#Cart .modal-body > .row`).append(bookComponent(book, status));
        }
      }
      // Check if cart is empty from items

      openModal("Cart");
    },
    error: function (response) {
      console.log(response);
    }
  })
}

function increaseOrderItem(orderItemId, btn) {
  let cartElement = $(btn).parents(".card"),
    buttons = cartElement.find("button");
  buttons.prop('disabled', true)
  // Pick the card by sending buttons to stop them to prevent many requests

  let dataForm = {
    orderItemId: orderItemId
  }

  $.ajax({
    url: "profile/increaseOrderItem",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);
      let bookId = response.data.orderItem.book_id;
      let subtotal = response.data.orderItem.subtotal;
      let quantity = response.data.orderItem.quantity;


      $(`#Cart .card[data-book-id="${bookId}"] .subtotal`).text(subtotal);
      $(`#Cart .card[data-book-id="${bookId}"] input`).val(quantity);
      $(`#Cart #CartTotalPrice`).text(response.data.totalPrice);

      buttons.prop('disabled', false);
    },
    error: function (response) {
      console.log(response);
      if (response.status == 422) {
        let errorMsg = response.responseJSON.data.bookId[0];
        isError(['error', errorMsg]);
      }
    }
  })


}

function decreaseOrderItem(orderItemId, btn) {
  let cartElement = $(btn).parents(".card"),
    buttons = cartElement.find("button");
  buttons.prop('disabled', true)
  // Pick the card by sending buttons to stop them to prevent many requests

  let dataForm = {
    orderItemId: orderItemId
  }

  $.ajax({
    url: "profile/decreaseOrderItem",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);
      let bookId = response.data.orderItem.book_id;
      let subtotal = response.data.orderItem.subtotal;
      let quantity = response.data.orderItem.quantity;

      if (quantity == 0) {
        $(`#Cart .card[data-book-id="${bookId}"]`).parent().parent().remove();
        if ($(`#Cart .card`).length == 0) {
          $(`#Cart .modal-body`).html(`
            <p class="alert alert-warning text-center w-75 m-auto">Your cart is empty</p>
         `);
        }
      } else {
        $(`#Cart .card[data-book-id="${bookId}"] .subtotal`).text(subtotal);
        $(`#Cart .card[data-book-id="${bookId}"] input`).val(quantity);
      }
      $(`#Cart #CartTotalPrice`).text(response.data.totalPrice);
      // Remove a specific item from cart

      buttons.prop('disabled', false);
    },
    error: function (response) {
      console.log(response);
      if (response.status == 422) {
        let errorMsg = response.responseJSON.data.bookId[0];
        isError(['error', errorMsg]);
      }
    }
  })
}

function deleteOrderItem(orderItemId, btn) {
  let cartElement = $(btn).parents(".card"),
    buttons = cartElement.find("button");
  buttons.prop('disabled', true)
  // Pick the card by sending buttons to stop them to prevent many requests

  let dataForm = {
    orderItemId: orderItemId
  }

  $.ajax({
    url: "profile/deleteOrderItem",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);
      cartElement.parent().parent().remove();
      // Remove the cart item

      if ($(`#Cart .card`).length == 0) {
        $(`#Cart .modal-body`).html(`
            <p class="alert alert-warning text-center w-75 m-auto">Your cart is empty</p>
         `);
      } else {
        $(`#Cart #CartTotalPrice`).text(response.data.totalPrice);
        buttons.prop('disabled', false);
      }
      
    },
    error: function (response) {
      console.log(response);
      if (response.status == 422) {
        let errorMsg = response.responseJSON.data.bookId[0];
        isError(['error', errorMsg]);
      }
    }
  })
}

function fireOrder(orderId){
  let dataForm = {
    orderId: orderId
  }

  $.ajax({
    url: "profile/fireOrder",
    type: "POST",
    data: dataForm,
    success: function (response) {
      console.log(response);

      $("#Cart .btn-close").get(0).click();
      $("#TotalItems").text(0);

      Swal.fire({
            title: `Done`,
            text: `Your order has been done`,
            icon: "success"
      });
    },
    error: function (response) {
      console.log(response);
    }
  })
}