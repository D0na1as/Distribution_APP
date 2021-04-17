//Order status
var shipped = "shipped";
var pending = "pending";
var received = "received";
var canceled = "canceled";


$(document).ready(function(){

        var id;
        $('#search_page').val($('#pag_page').val())
        $('#search_count').val($('#pag_count').val())
        getOrders(111, "pending");

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
//         $('#orderListModal').click('change', function() {
//            getOrders(111, "pending");
//        });

        $('#orderListModal').on('hidden.bs.modal', function() {
            $("#ordersTable").find("tr").remove();
            getOrders(111, pending);
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

        $('a[href="#editItemModal"]').click(function(e) {
                var id = $(this).parent().parent().parent().find("td:eq(0)").text();
                var qnt = $(this).parent().parent().parent().find("td:eq(1)").text();
                var title = $(this).parent().parent().parent().find("td:eq(2)").text();
                var serial = $(this).parent().parent().parent().find("td:eq(3)").text();
                $("#editId").val(id);
                $("#editQuantity").val(qnt);
                $("#editSerial").val(serial);
                $("#editTitle").val(title);
        })

        $('a[href="#deliveriesModal"]').click(function(e) {
                    getDeliveries(111, shipped);
                    getDeliveries(111, received);
                    getDeliveries(111, canceled);
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

        $(document).on('show.bs.modal', '.modal', function () {
             $("body").css("padding-right","0");
        });

        $(document).on('hide.bs.modal', '.modal', function () {
             $("body").css("padding-right","0");
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
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
            }
    });
}

//Get orders list
function getOrders(userId, status) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/order/all/'+userId+'/'+status,
            success: function(data) {
                    $('#pendingOrders').text(data.length);
                    data.forEach(function(order) {
                        $('#ordersTable').append(orderRow(order));
                        $('#ordersTable tr:last td:first').mouseover(function() {
                            $(this).css('cursor','pointer');
                        });
                    });
            },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
            }
    });
}

//Get orders list
function getDeliveries(userId, status) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/order/all/'+userId+'/'+status,
            success: function(data) {
                        data.forEach(function(order) {
                            $('#deliveriesTable').append(orderRow(order));
                            $('#deliveriesTable tr:last td:first').mouseover(function() {
                                $(this).css('cursor','pointer');
                            });
                        })
                    },
     });
}


//Get client
function getClient(clientId) {
     $.ajax({
            contentType : "application/json; charset=utf-8",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/account/client/'+clientId,
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
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
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
                alert("Item successfully updated!");
                location.reload(true);
                },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
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
                    alert("Item successfully "+status+"!");
                    $("#order_"+order).parent().parent().parent().parent().remove();
                },
           //Error handling
            error: function(xhr, status, error) {
                  var errorMessage = xhr.statusText + ': ' + xhr.status
                  alert('Alert! '+ errorMessage);
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
                alert("Item successfully added!");
                $('#addItemModal').modal('hide');
                location.reload(true);
                },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
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
function orderRow(order) {
        var status;
        if (order.status==pending) {
            status =
                     "            <div class=\"custom-control  custom-checkbox\">"+
                     "               <input type=\"checkbox\" class=\"custom-control-input \" id=\"order_"+ order.id+"\">"+
                     "               <label class=\"custom-control-label\" for=\"order_"+ order.id+"\"></label>"+
                     "            </div>";

        } else if (order.status==shipped) {
            status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
                      "    <button class=\"btn btn-warning btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-truck scale_120\"></i></span></button>"+
                      "</form>";
        } else if (order.status==received) {
                     status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
                               "    <button class=\"btn btn-success btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-check scale_120\"></i></span></button>"+
                               "</form>";
        } else if (order.status==canceled) {
                              status =  "<form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
                                        "    <button class=\"btn btn-danger btn-sm ml-1\" disabled><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-times scale_120\"></i></span></button>"+
                                        "</form>";
        }

        return  "<tr>"+
                "    <td><a href=\"#orderItemModal\" data-toggle=\"modal\">"+ order.id+"</a></td>"+
                "    <td><a href=\"#accountModal\" data-toggle=\"modal\">"+ order.client+"</a></td>"+
                "    <td class=\"align-middle p-0\">"+
                "        <form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
                        status +
                "        </form>"+
                "    </td>"+
                "</tr>";
}

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
