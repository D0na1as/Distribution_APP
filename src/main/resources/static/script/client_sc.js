$(document).ready(function(){
        $('#pag_down').click('change', function() {
            $('#pag_page option:selected').prev().attr('selected', 'selected');
        });
        $('#pag_up').click('change', function() {
            $('#pag_page option:selected').next().attr('selected', 'selected');
        });
        $('#editItemModal').on('show.bs.modal', function (e) {
          alert("Rodo");
        })
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
