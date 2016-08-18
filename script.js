$(document).ready(function() {

  var $btn1 = $('#btn1');
  var $btn2 = $('#btn2');
  var $btn3 = $('#btn3');
  var $btn4 = $('#btn4');
  var $btn5 = $('#btn5');

$btn1.on('click', function() {
  console.log('click click click');
  $.ajax({
    url: '',
    type: 'GET',

   }).done(function(data) {
     $result.html(
      //  "<p> Full Name: " + data.name + "</p> <p> Email: " + data.email + "</p> <p> Hobbies: " + data.hobbies + "</p> <p> Description: " + data.description + "</p>"
     );
   })
   .fail(function(request, textStatus, errorThrown) {
     $result.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
   });
 });

});
