    $(document).ready(function(){
 //timer code
    var fragmentTime;
    jQuery('.timeout_message_show').hide();
    var minutes = jQuery('span.minute').text();
    var seconds = jQuery('span.second').text();
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);
    if (isNaN(minutes)) {
      minutes = 00;
    }
    if (isNaN(seconds)) {
      seconds = 00;
    }
    if (minutes == 60) {
      minutes = 59;
    }
    if (seconds == 60) {
      seconds = 59;
    }
    fragmentTime = (60 * minutes) + (seconds);
    displayMinute = document.querySelector('span.minute');
    displaySecond = document.querySelector('span.second');
    startTimer(fragmentTime, displayMinute, displaySecond);
  });
   
  function startTimer(duration, displayMinute, displaySecond) {
    var timer = duration,
        displayMinute, displaySecond;
    var timeIntervalID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      displayMinute.textContent = minutes;
      displaySecond.textContent = seconds;
      if (--timer < 0) {
        timer = 0;
        if (timer == 0) {
          clearInterval(timeIntervalID);
          //alert(jQuery('.timeout_message_show').text());
        }
      }
    }, 1000);
  }
 
//select a vehicle option
//save selection to change vehicle image
//pass to the element outside of the modal

//listener for click on the input radio button
//when that element is clicked
//update the element with the id imageUsed, reflect what was chosen
//update the image source 
// update based on the ID
//<img id="imageUsed" src="assets/images/taxi.png"><br>
$(document).ready(function(){
$(".btn-group .btn").on("click", function() {
  var button= $(this)
  console.log(button.attr("data-image"))
  var active = $(".btn-default.active")
  console.log("active was clicked!");
  //get from the element the data image attribute
  //set image used src to that value
  $("#imageUsed").attr('src', button.attr("data-image"));
})});



//Google maps api code









