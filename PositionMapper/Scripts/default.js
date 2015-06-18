/// <reference path="jquery-2.1.4.js" />

var watchId;

$(document).ready(function () {
    getLocation();
});

function getLocation() {
    if (supportGeolocation()) {
        watchId = navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else {
        showMessage("Geolocation is not supported by this browser.");
    }
}

function supportGeolocation() {
    return 'geolocation' in navigator;
}

function showMessage(message) {
    $('#message').html(message);
}

function showError(error) {
    showMessage("error!");
}

function showPosition(postion) {
    var coords = new Microsoft.Maps.Location(postion.coords.latitude, postion.coords.longitude);
    var mapOptions = {
        credentials: "AlARQGY0XD7tLC2Gb5GATsDUdI3e8N8a_3i_7XWmnWzBwdL17ffi3m7AUOsfLL_3",
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 13,
        center: coords
    };
    var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
    // Retrieve the location of the map center 
    var center = map.getCenter();

    // Add a pin to the center of the map
    var pin = new Microsoft.Maps.Pushpin(center, { text: 'I am here!' });
    map.entities.push(pin);
}