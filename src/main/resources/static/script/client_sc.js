//Order status
var shipped = "shipped";
var pending = "pending";
var received = "received";
var canceled = "canceled";
var host = 'https://distrubutionapi.herokuapp.com';


$(document).ready(function(){

        var id;
        //getCart();
        $('#search_page').val($('#pag_page').val())
        $('#search_count').val($('#pag_count').val())

        $('#pag_page').on('change', function() {
            $('#search_page').val($('#pag_page').val());
        });

        $('#pag_count').on('change', function() {
            $('#search_count').val($('#pag_count').val());
        });

        $('#pag_down').click('change', function() {
            $('#pag_page option:selected').prev().attr('selected', 'selected');
        });

        $('#pag_up').click('change', function() {
            $('#pag_page option:selected').next().attr('selected', 'selected');
        });

        $('a[href="#"]').click(function(e) {
                var id = $(this).parent().parent().parent().find("input").val();
                var orderQnt = $(this).parent().find("input").val();
                var qnt = $(this).parent().parent().parent().find("td:eq(0)").text();
                if (orderQnt>qnt) {
                    infoWindow("Attention", "Not enough in storage!");
                } else if (orderQnt<1) {
                    infoWindow("Attention", "You have to input at least 1 unit to order!");
                } else {
                    addToCart(id, orderQnt);
                    getCart();

                }
        });

        $('a[href="#editItemModal"]').click(function(e) {
                var id = $(this).parent().parent().parent().find("input").val();
                var qnt = $(this).parent().parent().parent().find("td:eq(0)").text();
                var title = $(this).parent().parent().parent().find("td:eq(1)").text();
                var serial = $(this).parent().parent().parent().find("td:eq(2)").text();
                $("#editId").val(id);
                $("#editQuantity").val(qnt);
                $("#editSerial").val(serial);
                $("#editTitle").val(title);
        });

        $('#updateAcBtn').click(function(e) {
            getUserAc();
        });

        $('#PendingTable').on('focus click', function (e) {
            $('select').on('change', function() {
              var id = $(this).parent().parent().parent().parent().find("td:eq(0)").text();
              upOrderStatus(id, this.value) ;
            });
        });

        $('#ShippedTable').on('focus click', function (e) {
            $('select').on('change', function() {
              var id = $(this).parent().parent().parent().parent().find("td:eq(0)").text();
              upOrderStatus(id, this.value) ;
            });
        });

        $('#editConfirm').click('change', function() {
             var val = $("#editQuantity").val();
             if (val) {
                updateCart($("#editId").val(), val);
            } else {
                infoWindow("Cart info", "Quantity must be at least 1!");
            }
        });

        $('a[href="#orderItemModal"]').click(function(e) {
                var id = $(this).text();
                getOrderItems(id);
        });

        $('#orderButton').click( function() {
            createOrder();
        });

        $('#clearButton').click( function() {
            clearCart();
        });

        //Remove Item from Cart
//        $("#cartTable").on("click","button.btn", function() {
//            removeCartItem($(this).parent().parent().find("input").val());
//            $(this).parent().parent().remove();
//        });
//
//        $('#cartModal').on('show.bs.modal', function() {
//            alert("Cart remove");
//            $("#cartTable").find("tr").remove();
//            getCart();
//        });
});

//Info window
function infoWindow(title, text) {
    $("#messageTitle").text(title);
    $("#messageBody").text(text);
    $("#messageModal").modal('show');
}


//Update Item
function updateAccount(account) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'PUT',
            url: host+'/v1/client/account/',
            dataType: "json",
            data: JSON.stringify(account),
            success: function(data) {
                    infoWindow("Account info", "Account successfully updated.");
                    $('#messageModal').on('hidden.bs.modal', function() {
                        location.reload(true);
                    });
                },
           //Error handling
            error: function(xhr, status, error) {
            console.log(xhr);
                infoWindow("Cart info", xhr.responseJSON.message);
            }
    });
}

//Get client
function getUserAc() {

    var user = new Object();
    user.id = $("#clientId").val();
    user.email = $("#clientEmail").val();
    user.company = $("#clientCompany").val();
    user.name = $("#clientName").val();
    user.phone = $("#clientPhone").val();
    user.line1 = $("#clientAddress1").val();
    user.line2 = $("#clientAddress2").val();
    user.city = $("#clientCity").val();
    user.postcode = $("#clientPost").val();
    user.country= $("#clientCountry").val();
    console.log(user);
    if (user.id && user.email && user.company && user.name &&
        user.phone && user.line1 && user.line2 && user.city &&
        user.postcode && user.country) {

        updateAccount(user);

    } else {
        infoWindow("Account info!", "All fields must be filled!");
    }
}

//Update Item
function addToCart(id, qnt) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'POST',
            url: host+'/v1/client/cart/item?itemId='+id+'&quantity='+qnt,
            success: function() {
                    infoWindow("Cart info", "Item successfully added to cart.");
                    $('#messageModal').on('hidden.bs.modal', function() {
                        location.reload(true);
                    });
                },
           //Error handling
            error: function(xhr, status, error) {
                infoWindow("Cart info", xhr.responseJSON.message);
            }
    });
}

//Update Item
function updateCart(id, qnt) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'PUT',
            url: host+'/v1/client/cart/item?itemId='+id+'&quantity='+qnt,
            success: function() {
                    $('#editItemModal').modal('hide');
                    infoWindow("Cart info", "Item count successfully updated.");
                    $('#messageModal').on('hidden.bs.modal', function() {
                        location.reload(true);
                    });
                },
           //Error handling
            error: function(xhr, status, error) {
                $('#editItemModal').modal('hide');
                infoWindow("Cart info", xhr.responseJSON.message);
            }
    });
}

//Update order status
function upOrderStatus(order, status) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'Put',
            url: host+'/v1/client/order/'+order+'?status='+status,
            success: function() {
                    infoWindow("Status update", "Order "+order+" successfully " +status+ "!");
                    $('#messageModal').on('hidden.bs.modal', function() {
                        location.reload(true);
                    });
                },
           //Error handling
            error: function(xhr, status, error) {
                  infoWindow("Error alert", xhr.responseJSON.message);
            }
    });
}

//Get cart count
function getCart() {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'GET',
            url: host+'/v1/client/cart/',
            success: function(data) {
                    //$('#cartItems').text(data.length);
//                    $('#messageModal').on('hidden.bs.modal', function() {
//                        location.reload(true);
//                    });
                },
           //Error handling
            error: function(xhr, status, error) {
              infoWindow("Error alert", xhr.responseJSON.message);
            }
    });
}

 //Update Item
  function createOrder() {
        var client = $("#username").val();
       $.ajax({
              contentType : "application/json; charset=utf-8",
              type : 'POST',
              url: host+'/v1/client/order/?client='+client,
              success: function(resp) {
                      infoWindow("Order info", "New order "+resp+" created.");
                      $('#messageModal').on('hidden.bs.modal', function() {
                          location.reload(true);
                      });
                  },
             //Error handling
              error: function(xhr, status, error) {
                    infoWindow("Error alert", xhr.responseJSON.message);
              }
      });
  }

//Update Item
function clearCart() {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'DELETE',
            url: host+'/v1/client/cart/clean',
            success: function() {
                location.reload(true);
                },
           //Error handling
            error: function(xhr, status, error) {
                  infoWindow("Error alert", xhr.responseJSON.message);
            }
    });
}

  //Get orders list
  function getOrderItems(orderId) {
       $.ajax({
              contentType : "application/json; charset=utf-8",
              dataType: "json",
              type : 'Get',
              url: host+'/v1/user/order/'+orderId,
              success: function(data) {
                      $("#orderItemsTable").find("tr").remove();
                      data.forEach(function(item) {
                          $('#orderItemsTable').append(orderItemRow(item));
                      });
                      },
             //Error handling
              error: function(xhr, status, error) {
                infoWindow("Error alert", xhr.responseJSON.message);
              }
      });
  }

//Order items table element
function orderItemRow(item) {
        return  "<tr>"+
                "    <td>"+item.id+"</td>"+
                "    <td>"+item.title+"</td>"+
                "    <td>"+item.serial+"</td>"+
                "    <td>"+item.quantity+"</td>"+
                "</tr>";
}

//
////Order items table element
//function cartRow(item) {
//        return  "<tr>"+
//                "   <input value="+ item.id +" type=\"hidden\">"+
//                "    <td>"+item.title+"</td>"+
//                "    <td>"+item.serial+"</td>"+
//                "    <td>"+item.quantity+"</td>"+
//                "    <td><button class=\"btn  btn-sm ml-1\" type=\"submit\"><i class=\"fas fa-times scale_120\"></i></button></td>"+
//                "</tr>";
//
//}

