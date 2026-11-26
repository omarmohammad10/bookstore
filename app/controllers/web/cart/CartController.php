<?php
require_once __DIR__ . "/../../Controller.php";
require_once __DIR__ . "/../../../models/cart/CartModel.php";
class CartController extends Controller
{
  public function addToCart()
  {
    // Response::json(Request::all());
    $errors = Request::validate([
      'bookId' => ['required',['exists','books','id']],
      'quantity' => ['required']
    ]);
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }
    CartModel::addToCart();
    $totalItems = CartModel::totalOrderItems();
    Response::json([
      'totalItems' => $totalItems
    ]);
  }

  public function getCartItems(){
    if(Request::input('orderId') != null){
      $errors = Request::validate([
        'orderId' => ['required',['exists','orders','id']]
      ]);

      if(!empty($errors)){
        Response::json($errors , status:422);
      }
    }

    $data = CartModel::getCartItems(Request::input('orderId'));
    Response::json($data);
  }

  public function increaseOrderItem()
  {
    $errors = Request::validate([
      "orderItemId" => ['required',['exists','orders_items','id']]
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    $data = CartModel::increaseOrderItem();
    Response::json($data);
  }

  public function decreaseOrderItem()
  {
    $errors = Request::validate([
      "orderItemId" => ['required',['exists','orders_items','id']]
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    $data = CartModel::decreaseOrderItem();
    Response::json($data);
  }

  public function deleteOrderItem()
  {
    $errors = Request::validate([
      "orderItemId" => ['required',['exists','orders_items','id']]
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    $data = CartModel::deleteOrderItem();
    Response::json($data);
  }

  public function fireOrder()
  {
    $errors = Request::validate([
      "orderId" => ['required',['exists','orders','id']]
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    CartModel::fireOrder();
  }
}