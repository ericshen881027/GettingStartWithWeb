/// <reference path="jquery-2.1.4.js" />

var millisecons = 1000;
var opacity = 0.5;

function displayCoverAsync() {
    return $('#cover').fadeTo(millisecons, opacity).promise();
}

function showMessageContentAsync(message) {
    $('#message').html(message);
    $('#messageBox').show();
    return $('#messageContent').slideDown(millisecons).promise();
}

function showMessageAsync(message) {
    var coverPromise = displayCoverAsync();
    var messagePromise = coverPromise.pipe(function () {
        return showMessageContentAsync(message);
    });
    return messagePromise;
}

function displayTimeAsync() {
    var message = 'The time is now ' + getTime();
    return showMessageAsync(message);
}

function getTime() {
    var dateTime = new Date();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    return hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

function hideMessageContentAsync(message) {
    var promise = $('#messageContent').slideUp(millisecons).promise();
    promise.done(function () { $('#messageBox').hide(); });
    return promise;
}

function hideCoverAsync() {
    return $('#cover').fadeOut(millisecons).promise();
}

function hideMessageAsync() {
    var messagePromise = hideMessageContentAsync();
    var coverPromise = messagePromise.pipe(function () {
        return hideCoverAsync();
    });
    return coverPromise;
}