$(document).ready(function(){
    var count = $('#count_select').val();
    var page =
    $('#count_select').on('change', function() {
        alert( this.value );
    });
    $('a[href = "#pag_right"]').click(function(){
        alert('Sign new href executed.');
    });
    $('a[href = "#pag_first"]').click(function(){
        alert('Sign new href executed.');
    });
    $('a[href = "#pag_last"]').click(function(){
        getPage(1, 2);
    });
    $('#pag_input').on({
        'focusout': function(){
           alert('Sign new href executed.');
        },
        'keypress': function(e){
          if (e.keyCode === 13) {
            $('#pag_input').blur();
          }
        }
        });
});

//get Page
function getPage(page, count) {
     $.ajax({
            dataType: "json",
            type : 'Get',
            data: { 'count': count },
            url: 'http://localhost:8082/v1/user/storage/page/'+page,
            success: function(data) {
                $('#table-body').empty();
                $('#table-body').append(renderTable(data));
                $('li').removeClass('active');
                $('li').addClass('active');
                //console.log($('#count_select').val());
                },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
            }
    });
}

//get request
function itemCount() {
     $.ajax({
            dataType: "json",
            type : 'Get',
            url: 'http://localhost:8082/v1/user/storage/item/count',
            success: function(data) {
                console.log(data);
                },
           //Error handling
            error: function(xhr, status, error) {
              var errorMessage = xhr.statusText + ': ' + xhr.status
              alert('Alert! '+ errorMessage);
            }
    });
}

//get request
function renderTable(data) {
    var result;
    for ( var i=0; i<data.length; i++) {
        result += tableItem(data[i].quantity, data[i].title, data[i].serial);
    };
    return result;
}

//Table item HTML
function tableItem(qnt, title, serial) {
        return "<tr>"+
               "<th scope=\"row\">"+ qnt +"</th>"+
               "     <td>"+ title +"</td>"+
               "     <td>"+ serial +"</td>"+
               "     <td class=\"align-middle p-0\">"+
               "        <form class=\"form-inline justify-content-center my-2 my-lg-0\">"+
               "            <button class=\"btn btn-info btn-sm ml-1\" type=\"submit\"><span class=\"pl-4 pr-4\" type=\"submit\"><i class=\"fas fa-pencil-alt scale_120\"></i></span></button>"+
               "        </form>"+
               "    </td>"+
               "</tr>";
}
