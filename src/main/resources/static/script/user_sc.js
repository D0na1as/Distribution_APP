//Order status
var shipped = "shipped";
var pending = "pending";
var received = "received";
var canceled = "canceled";


$(document).ready(function(){

        var id;
        $('#search_page').val($('#pag_page').val())
        $('#search_count').val($('#pag_count').val())
        //getOrdersCount("pending");

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

         $('#addItemConfirm').click('change', function() {
            addItem($("#addTitle").val(),
                    $("#addSerial").val(),
                    $("#addQuantity").val())
        });

        $('#cartTable').on('focus click', function (e) {
            $('select').on('change', function() {
              var id = $(this).parent().parent().parent().find("td:eq(0)").text();
              upOrderStatus(id, this.value) ;
            });
        });

        $('#ShippedTable').on('focus click', function (e) {
            $('select').on('change', function() {
              var id = $(this).parent().parent().parent().parent().find("td:eq(0)").text();
              upOrderStatus(id, this.value) ;
            });
        });

        $('#orderListModal').on('hidden.bs.modal', function() {

        });

        $('#ordersTable').on('click','a[href="#orderItemModal"]', function(){
            getOrderItems($(this).text());
        });

        $('#ordersTable').on('click','a[href="#accountModal"]', function(){
                getClient($(this).text());
        });

        $('#orderSend').click('change', function() {
            $('input:checkbox:checked').each(function()
            {
                id = $(this).attr("id").split("_").pop();
                upOrderStatus(id, shipped);
            });
        });

        $('#orderDecline').click('change', function() {
           $('input:checkbox:checked').each(function()
           {
               id = $(this).attr("id").split("_").pop();
               upOrderStatus(id, "canceled");
           });
        });

        $('#orderItemModal').on('show.bs.modal', function() {
            $('#orderListModal').css("z-index", 1050);
            $('.modal-backdrop.show').css("z-index", 1051);
            $('#orderItemModal').css("z-index", 1052);
            $("#orderItemsTable").find("tr").remove();
        });

        $('#orderItemModal').on('hidden.bs.modal', function () {
              $('.modal-backdrop.show').css("z-index", "");
              $('#orderListModal').css("z-index", "");
              $('#orderItemModal').css("z-index", "");
        });

        $('#editConfirm').click('change', function() {
            updateItem($("#editId").val(),
                       $("#editTitle").val(),
                       $("#editSerial").val(),
                       $("#editQuantity").val())
        });

        $('#updateAcBtn').click(function(e) {
            getUserAc();
        });

        $('a[href="#orderItemModal"]').click(function(e) {
                var id = $(this).text();
                getOrderItems(id);
        });

        $('a[href="#accountModal"]').click(function(e) {
                var clientId = $(this).text();
                getClient(clientId);
        })

        $('a[href="#editItemModal"]').click(function(e) {
                var id = $(this).parent().parent().parent().find("input").val();
                var qnt = $(this).parent().parent().parent().find("td:eq(0)").text();
                var title = $(this).parent().parent().parent().find("td:eq(1)").text();
                var serial = $(this).parent().parent().parent().find("td:eq(2)").text();
                $("#editId").val(id);
                $("#editQuantity").val(qnt);
                $("#editSerial").val(serial);
                $("#editTitle").val(title);
        })

        $('a[href="#deliveriesModal"]').click(function(e) {
                    getDeliveries(shipped);
                    getDeliveries(received);
                    getDeliveries(canceled);
        });

        $('#deliveriesTable').on('click','a[href="#accountModal"]', function(){
                getClient($(this).text());
        });

        $('#deliveriesTable').on('click','a[href="#orderItemModal"]', function(){
            getOrderItems($(this).text());
        });

        $('#deliveriesModal').on('hidden.bs.modal', function() {
            $("#deliveriesTable").find("tr").remove();
        });

         $('li[href="#accountModal"]').click( function(){
              getClient(12321);
         });
        $('#accountModal').on('hidden.bs.modal', function() {
                emptyAccModal();
        });
});

function emptyAccModal() {
        $("#clientEmail").val("");
        $("#clientCompany").val("");
        $("#clientName").val("");
        $("#clientPhone").val("");
        $("#clientAddress1").val("");
        $("#clientAddress2").val("");
        $("#clientCity").val("");
        $("#clientPost").val("");
        $("#clientCountry").val("");
}

//Info window
function infoWindow(title, text) {
    $("#messageTitle").text(title);
    $("#messageBody").text(text);
    $("#messageModal").modal('show');

}

//Get orders list
//function getOrdersCount(status) {
//     $.ajax({
//            contentType : "application/json; charset=utf-8",
//            dataType: "json",
//            type : 'Get',
//            url: 'http://localhost:8082/v1/user/order/status/'+status,
//            success: function(data) {
//                    $('#pendingOrders').text(data.length);
//            },
//           //Error handling
//            error: function(xhr, status, error) {
//              infoWindow("Error alert", xhr.responseJSON.message);
//            }
//    });
//}

//Get orders list
function getOrderItems(orderId) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/order/'+orderId,
            success: function(data) {
                    data.forEach(function(item) {
                        $('#orderItemsTable').append(orderItemRow(item));
                    });
                    },
           //Error handling
            error: function(xhr, status, error) {
                console.log(xhr);
              infoWindow("Error alert", xhr.responseJSON.message);
            }
    });
}

//Get orders list
//function getDeliveries(userId, status) {
//     $.ajax({
//            contentType : "application/json; charset=utf-8",
//            dataType: "json",
//            type : 'Get',
//            url: 'http://localhost:8082/v1/user/order/status/'+status,
//            success: function(data) {
//                        data.forEach(function(order) {
//                            $('#deliveriesTable').append(orderRow(order));
//                            $('#deliveriesTable tr:last td:first').mouseover(function() {
//                                $(this).css('cursor','pointer');
//                            });
//                        })
//                    },
//     });
//}

//Update Item
function updateAccount(account) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'PUT',
            url: 'http://localhost:8082/v1/user/account/',
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
    user.id = $("#userId").val();
    user.email = $("#userEmail").val();
    user.company = $("#userCompany").val();
    user.name = $("#userName").val();
    user.phone = $("#userPhone").val();
    user.line1 = $("#userAddress1").val();
    user.line2 = $("#userAddress2").val();
    user.city = $("#userCity").val();
    user.postcode = $("#userPost").val();
    user.country= $("#userCountry").val();
    if (user.id && user.email && user.company && user.name &&
        user.phone && user.line1 && user.line2 && user.city &&
        user.postcode && user.country) {

        updateAccount(user);

    } else {
        infoWindow("Account info!", "All fields must be filled!");
    }
}

//Get client
function getClient(clientId) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/account/'+clientId,
            success: function(data) {
                    var client = data;
                            $("#clientEmail").val(client.email);
                            $("#clientCompany").val(client.company);
                            $("#clientName").val(client.name);
                            $("#clientPhone").val(client.phone);
                            $("#clientAddress1").val(client.line1);
                            $("#clientAddress2").val(client.line2);
                            $("#clientCity").val(client.city);
                            $("#clientPost").val(client.postcode);
                            $("#clientCountry").val(client.country);
                    },
           //Error handling
            error: function(xhr, status, error) {
                infoWindow("Alert!", xhr.responseJSON.message);
            }
    });
}

//Update Item
function updateItem(id, title, serial, qnt) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Put',
            url: 'http://localhost:8082/v1/user/storage/item/'+id,
            data: JSON.stringify( { "id": id,
                                    "title": title,
                                    "serial": serial,
                                    "quantity": qnt } ),
            success: function(data) {
                $('#editItemModal').modal('hide');
                infoWindow("Item update", "Item "+title+" successfully updated!");
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
function upOrderStatus(order, status) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            type : 'Put',
            url: 'http://localhost:8082/v1/user/order/'+order+'?status='+status,
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

function addItem(title, serial, qnt) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Post',
            url: 'http://localhost:8082/v1/user/storage/item',
            data: JSON.stringify( { "title": title,
                                    "serial": serial,
                                    "quantity": qnt } ),
            success: function(data) {
                $('#addItemModal').modal('hide');
                infoWindow("New item", title+" successfully added to storage.");
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

//Order items table element
function orderItemRow(item) {
        return  "<tr>"+
                "    <td>"+item.id+"</td>"+
                "    <td>"+item.title+"</td>"+
                "    <td>"+item.serial+"</td>"+
                "    <td>"+item.quantity+"</td>"+
                "</tr>";
}

//Order table element
//function orderRow(order) {
//        var status;
//        if (order.status==pending) {
//            status =
//                     "            <div class=\"custom-control  custom-checkbox\">"+
//                     "               <input type=\"checkbox\" class=\"custom-control-input \" id=\"order_"+ order.id+"\">"+
//                     "               <label class=\"custom-control-label\" for=\"order_"+ order.id+"\"></label>"+
//                     "            </div>";
//
//        } else if (order.status==shipped) {
//            status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
//                      "    <button class=\"btn btn-warning btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-truck scale_120\"></i></span></button>"+
//                      "</form>";
//        } else if (order.status==received) {
//                     status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
//                               "    <button class=\"btn btn-success btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-check scale_120\"></i></span></button>"+
//                               "</form>";
//        } else if (order.status==canceled) {
//                              status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
//                                        "    <button class=\"btn btn-danger btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-times scale_120\"></i></span></button>"+
//                                        "</form>";
//        }
//
//        return  "<tr>"+
//                "    <td><a href=\"#orderItemModal\" data-toggle=\"modal\">"+ order.id+"</a></td>"+
//                "    <td><a href=\"#accountModal\" data-toggle=\"modal\">"+ order.client+"</a></td>"+
//                "    <td class=\"align-middle p-0\">"+
//                "        <form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
//                        status +
//                "        </form>"+
//                "    </td>"+
//                "</tr>";
//}

//<tr>
//    <td>Alloy Wheels</td>
//    <td>JDSF443JDDS</td>
//    <td class="align-middle p-0">
//        <form class="form-inline justify-content-center my-2 my-lg-0">
//            <input class="form-control form-control-sm tbl_input_width  mr-sm-2" type="number" value=0 required>
//            <button class="btn  btn-sm ml-1" type="submit"><span type="submit" class="mr-1"><i class="fas fa-times scale_120"></i></span></button>
//        </form>
//    </td>
//</tr>


//
////get Page
//function getPage(page, count) {
//     $.ajax({
//            dataType: "json",
//            type : 'Get',
//            data: { 'count': count },
//            url: 'http://localhost:8082/v1/user/storage/page/'+page,
//            success: function(data) {
//                $('#table-body').empty();
//                $('#table-body').append(renderTable(data));
//                $('li').removeClass('active');
//                $('li').addClass('active');
//                //console.log($('#count_select').val());
//                },
//           //Error handling
//            error: function(xhr, status, error) {
//              var errorMessage = xhr.statusText + ': ' + xhr.status
//              alert('Alert! '+ errorMessage);
//            }
//    });
//}
//
////get request
//function itemCount() {
//     $.ajax({
//            dataType: "json",
//            type : 'Get',
//            url: 'http://localhost:8082/v1/user/storage/item/count',
//            success: function(data) {
//                return data;
//                },
//           //Error handling
//            error: function(xhr, status, error) {
//              var errorMessage = xhr.statusText + ': ' + xhr.status
//              alert('Alert! '+ errorMessage);
//            }
//    });
//}
//
////get request
//function renderTable(data) {
//    var result;
//    for ( var i=0; i<data.length; i++) {
//        result += tableItem(data[i].quantity, data[i].title, data[i].serial);
//    };
//    return result;
//}
//
//function pagLast(allCount, count) {
//        if (allCount<=count) {
//            $('#pag_last').text(1);
//        } else {
//            if ( allCount % count > 0 ) {
//                var pag = Math.floor(allCount / count) + 1;
//                $('#pag_last').text(pag);
//            } else {
//                $('#pag_last').text(allCount / count);
//            }
//        }
//}
//
////Table item HTML
//function tableItem(qnt, title, serial) {
//        return "<tr>"+
//               "<th scope=\"row\">"+ qnt +"</th>"+
//               "     <td>"+ title +"</td>"+
//               "     <td>"+ serial +"</td>"+
//               "     <td class=\"align-middle p-0\">"+
//               "        <form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
//               "            <button class=\"btn btn-info btn-sm ml-1\" type=\"submit\"><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-pencil-alt scale_120\"></i></span></button>"+
//               "        </form>"+
//               "    </td>"+
//               "</tr>";
//}
