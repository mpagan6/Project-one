$(document).ready(function() {
  //timer code
  var fragmentTime;
  jQuery(".timeout_message_show").hide();
  var minutes = jQuery("span.minute").text();
  var seconds = jQuery("span.second").text();
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
  fragmentTime = 60 * minutes + seconds;
  displayMinute = document.querySelector("span.minute");
  displaySecond = document.querySelector("span.second");
  startTimer(fragmentTime, displayMinute, displaySecond);

  function startTimer(duration, displayMinute, displaySecond) {
    var timer = duration,
      displayMinute,
      displaySecond;
    var timeIntervalID = setInterval(function() {
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

  $(".btn-group .btn").on("click", function() {
    var button = $(this);
    console.log(button.attr("data-image"));
    var active = $(".btn-default.active");
    console.log("active was clicked!");
    //get from the element the data image attribute
    //set image used src to that value
    $("#imageUsed").attr("src", button.attr("data-image"));
  });

  //Google maps api code
  var randomLat = Math.random() * (41.74431 - 42.018328) + 42.018328;
  var randomLong = Math.random() * (-87.666084 - -87.733375) + -87.733375;
  var strLat = randomLat.toString();
  var strLong = randomLong.toString();
  var fenway = strLat + ", " + strLong;
  var randomLat2 = (
    Math.random() * (41.74431 - 42.018328) +
    42.018328
  ).toString();
  var randomLong2 = (
    Math.random() * (-87.666084 - -87.733375) +
    -87.733375
  ).toString();
  var dropOff = randomLat2 + ", " + randomLong2;
  var distanceTraveled = getDistanceFromLatLonInMi(
    randomLat,
    randomLong,
    randomLat2,
    randomLong2
  );
  //Create durationTraveled variable and console.log to check if it works
  var durationTraveled =
    getDistanceFromLatLonInMi(randomLat, randomLong, randomLat2, randomLong2) *
    2.16;
  console.log(durationTraveled);
  $("#start").val(fenway);
  $("#end").val(dropOff);

  $("#addRide").on("click", function() {
    console.log("you hit a ride");
    randomLat = Math.random() * (41.74431 - 42.018328) + 42.018328;
    randomLong = Math.random() * (-87.666084 - -87.733375) + -87.733375;
    strLat = randomLat.toString();
    strLong = randomLong.toString();
    fenway = strLat + ", " + strLong;
    randomLat2 = (
      Math.random() * (41.74431 - 42.018328) +
      42.018328
    ).toString();
    randomLong2 = (
      Math.random() * (-87.666084 - -87.733375) +
      -87.733375
    ).toString();
    dropOff = randomLat2 + ", " + randomLong2;
    //Console.log to make sure it works
    console.log(
      getDistanceFromLatLonInMi(randomLat, randomLong, randomLat2, randomLong2)
    );
    distanceTraveled = getDistanceFromLatLonInMi(
      randomLat,
      randomLong,
      randomLat2,
      randomLong2
    );
    //Create durationTraveled variable and console.log to check if it works
    durationTraveled =
      getDistanceFromLatLonInMi(
        randomLat,
        randomLong,
        randomLat2,
        randomLong2
      ) * 2.16;
    console.log(durationTraveled);

    //Set UberSelect Rates
    var uberSelectstart = 4.0;
    var uberSelectmile = 2.05;
    var uberSelectmin = 0.35;
    var uberXlminFare = 10.9;
    //Calculate rates
    var uberSelectfee =
      uberSelectstart +
      distanceTraveled * uberSelectmile +
      durationTraveled * uberSelectmin;
    //Convert to 2 decimal places
    uberSelectfee = uberSelectfee.toFixed(2);
    //Console.log UberX Fee
    console.log("UberSelect Fee: " + uberSelectfee);

    $(".member-list").append(
      "<tr><td><name='record'></td><td>" +
        distanceTraveled +
        "</td><td>" +
        durationTraveled +
        "</td><td>" +
        "$" +
        uberSelectfee +
        "</td><td>" +
        "</td></tr>"
    );

    $("#start").val(fenway);
    $("#end").val(dropOff);
    initMap();
  });

  //Find distance function
  function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in miles
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in mi
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // //Set UberPool Rates
  //   var uberPstart = 1.70;
  //   var uberPmile = .95;
  //   var uberPmin = .14;
  //   var uberPminFare = 4.60;
  // //Calculate rates
  //   var uberPoolfee = uberPstart + (distanceTraveled * uberPmile) + (durationTraveled * uberPmin);
  // //Convert to 2 decimal places
  //   uberPoolfee = uberPoolfee.toFixed(2);
  //   //Console.log UberX Fee
  //   console.log("UberPool Fee: " + uberPoolfee);

  // //Set UberX Rates
  //   var uberXstart = 1.70;
  //   var uberXmile = .95;
  //   var uberXmin = .20;
  //   var uberXminFare = 4.60;

  // //Calculate rates
  //   var uberXfee = uberXstart + (distanceTraveled * uberXmile) + (durationTraveled * uberXmin);
  // //Convert to 2 decimal places
  //   uberXfee = uberXfee.toFixed(2);
  //   //Console.log UberX Fee
  //   console.log("UberX Fee: " + uberXfee);

  // //Set UberXl Rates
  //   var uberXlstart = 3.00;
  //   var uberXlmile = 1.80;
  //   var uberXlmin = .35;
  //   var uberXlminFare = 8.90;
  // //Calculate rates
  //   // var uberXlfee = uberXlstart + (distanceTraveled * uberXlmile) + (durationTraveled * uberXlmin);
  // //Convert to 2 decimal places
  //   uberXlfee = uberXlfee.toFixed(2);
  //   //Console.log UberX Fee
  //   console.log("UberXL Fee: " + uberXlfee);

  //   //Set UberSelect Rates
  //   var uberSelectstart = 4.00;
  //   var uberSelectmile = 2.05;
  //   var uberSelectmin = .35;
  //   var uberXlminFare = 10.90;
  // //Calculate rates
  //   var uberSelectfee = uberSelectstart + (distanceTraveled * uberSelectmile) + (durationTraveled * uberSelectmin);
  // //Convert to 2 decimal places
  //   uberSelectfee = uberSelectfee.toFixed(2);
  //   //Console.log UberX Fee
  //   console.log("UberSelect Fee: " + uberSelectfee);

  // $(".member-list").append("<tr><td><name='record'></td><td>" + distanceTraveled +  "</td><td>" + durationTraveled + "</td><td>" + "$" +uberSelectfee + "</td><td>" + "</td></tr>");

  function distance() {
    var start;
    var end;
    console.log(strLat);
  }

  // $('#start').val(fenway)
  // $('#end').val(dropOff)

  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: randomLat, lng: randomLong }
    });
    directionsDisplay.setMap(map);

    var berkeley = { lat: randomLat, lng: randomLong };
    var sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano")
    );
    sv.getPanorama({ location: berkeley, radius: 50 }, processSVData);
    function processSVData(data, status) {
      if (status === "OK") {
        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);
      }
    }

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document
      .getElementById("start")
      .addEventListener("change", onChangeHandler());
    document
      .getElementById("end")
      .addEventListener("change", onChangeHandler());

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route(
        {
          origin: document.getElementById("start").value,
          destination: document.getElementById("end").value,
          travelMode: "DRIVING",
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        },
        function(response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  }
});
