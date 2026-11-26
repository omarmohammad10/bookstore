<?php

/** 
 *@var array $orders
 */
?>

<div class="table-responsive">
  <table class="table table-info table-hover table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Customer</th>
        <th>Total Price</th>
        <th>Details</th>
        <th>created_at</th>
        <?php
        if (isAuth('admin')) {
          echo "<th>Options</th>";
        }
        ?>
      </tr>
    </thead>
    <tbody>
      <?php
      if (!empty($orders['ordered']['data'])) {
        foreach ($orders['ordered']['data'] as $order) {
          $additionalOption = "";
          if (isAuth('admin')) {
            $additionalOption = "
          <td>
            <div class='buttons'>
              <button class='btn btn-danger me-2' data-bs-toggle='modal' data-bs-target='#CanceledReason' onclick='openCancelReasonModal({$order['id']})'>Cancel</button>
              <button class='btn btn-success' onclick='doneOrder({$order['id']})'>Done</button>
            </div>
          </td>
            ";
          }
          echo "
      <tr data-order-id='{$order['id']}'>
        <th>{$order['id']}</th>
        <td>{$order['customer_name']}</td>
        <td>{$order['total_price']}</td>
        <td><a href='#' onclick='getCartItems({$order['id']},`showOrder`)'>Show</a></td>
        <td>{$order['created_at']}</td>
        {$additionalOption}
      </tr>
  ";
        }
      } else {
        echo "<p class='alert alert-warning text-center w-75 m-auto mb-3'>No ordered orders here</p>";
      }
      ?>
    </tbody>
  </table>
</div>

<?php
preparePagination($orders['ordered'], 'orders_ordered');
?>

<!-- Cancel Reason modal -->
<div class="modal fade" id="CanceledReason" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Cancel Reason</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="TextArea" class="form-label">Cancel Reason</label>
          <textarea class="form-control" id="TextArea" rows="8"></textarea>
        </div>
        <button class="btn btn-danger w-100" onclick="cancelOrder()">Cancel Order</button>
      </div>
    </div>
  </div>
</div>

