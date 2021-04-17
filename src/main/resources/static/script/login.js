
 $("#login-button").click(function(event){
//		 event.preventDefault();
//
//	 $('form').fadeOut(500);
//	 $('.wrapper').addClass('form-success');
//
//	 setTimeout(
//       function()
//       {
         $('form').submit();
//       }, 200);
});

function infoWindow(title, text) {
    $("#messageTitle").text(title);
    $("#messageBody").text(text);
    $("#messageModal").modal('show');
}