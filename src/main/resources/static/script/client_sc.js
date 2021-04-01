$(document).ready(function(){
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

        $('#orderItemModal').on('hidden.bs.modal', function () {
              $('.modal-backdrop.show').css("z-index", "");
              $('#orderListModal').css("z-index", "");
              $('#orderItemModal').css("z-index", "");
        });

        $('#mygtukas').click('change', function() {
            $('.modal-backdrop.show').css("z-index", "1051");
            $('#orderListModal').css("z-index", "1050");
            $('#orderItemModal').css("z-index", "1052");
        });

        $('#editConfirm').click('change', function() {
            updateItem($("#editId").val(),
                       $("#editTitle").val(),
                       $("#editSerial").val(),
                       $("#editQuantity").val())
        });

        $('a[href="#orderListModal"]').click(function(e) {
            getOrders(111, "pending");
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
        });

//        $('#updateBtn').click(function(e) {
//        alert("Btn click");
//            var h3title = $(this).parent().parent().parent().find("#title").text();
//            console.log(h3title);
//          });

//    itemCount();
//    var page =
//    $('#count_select').on('change', function() {
//        alert( this.value );
//    });
//  $('#pagination').click(function (e) {
//    if (e.target.id=="pag_first") {
//          itemCount();
//          getPage($('#pag_first').text(), $('#count_select').val());
//          $( '#pag_first' ).addClass( "bg-primary border-primary text-white" );
//          $( '#pag_first' ).blur();
//    } else if (e.target.id=="pag_last") {
//          itemCount();
//          getPage($('#pag_last').text(), $('#count_select').val());
//          $( '#pag_first' ).addClass( "bg-primary border-primary text-white" );
//          $( '#pag_first' ).blur();
//    }
//  });
//    $('#pag_input').on({
//        'focusout': function(){
//           alert('Sign new href executed.');
//        },
//        'keypress': function(e){
//          if (e.keyCode === 13) {
//            $('#pag_input').blur();
//          }
//        }
//        });
});

//Get orders list
function getOrders(userId, status) {
     $.ajax({
            contentType : "application/json",
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/order/all/'+userId+'/'+status,
            success: function(data) {
                    data.forEach(function(order) {
                        $('#ordersTable tr:last').after(orderRow(order));
                    });
                    },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
            }
    });
}

//Table item HTML
function orderListEl(order) {

}

//Update Item
function updateItem(id, title, serial, qnt) {
     $.ajax({
            contentType : "application/json",
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

function addItem(title, serial, qnt) {
     $.ajax({
            contentType : "application/json",
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
//Order table element
function orderRow(order) {
        return  "<tr>"+
                "    <td>"+ order.id+"</td>"+
                "    <td>"+ order.client+"</td>"+
                "    <td class=\"align-middle p-0\">"+
                "        <form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
                "            <div class=\"custom-control  custom-checkbox\">"
                "               <input type=\"checkbox\" class=\"custom-control-input \" id=\"customCheck\">"+
                "               <label class=\"custom-control-label\" for=\"customCheck\"></label>"+
                "            </div>"+
                "        </form>"+
                "    </td>"+
                "</tr>";
}

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
