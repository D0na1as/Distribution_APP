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

});