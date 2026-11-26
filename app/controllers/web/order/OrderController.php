<?php
require_once __DIR__ . "/../../Controller.php";
require_once __DIR__ . "/../../../../core/Request.php";

class OrderController extends Controller
{
  public function cancelOrder()
  {
    $errors = Request::validate([
      "orderId" => ['required',['exists','orders','id']],
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    OrderModel::cancelOrder();
  }

  public function doneOrder()
  {
    $errors = Request::validate([
      "orderId" => ['required',['exists','orders','id']]
    ]);
    
    if(!empty($errors)){
      Response::json($errors , status: 422);
    }

    OrderModel::doneOrder();
  }
}