"use strict"
$(document).ready( function () {
  $('#submitButton').on('click',function () {
    let commentsDiv = document.getElementById('commentsDiv');
    let formData = $('#newCommentForm').serialize();
    let usernameInput = $('#username');
    let commentInput = $('#comment');

    $.post('/', formData, function (res) {

      commentsDiv.innerHTML += `<h4>${usernameInput.val()}</h4>
                                <p>${commentInput.val()}</p>
                                <h6>${getCurrentTime()}</h6>
                                <hr>`
      usernameInput.val('');
      commentInput.val('');
    });
  });
});

function getCurrentTime() {
  let currentTime = new Date();
  return currentTime.getDate() + "/"
    + (currentTime.getMonth()+1)  + "/"
    + currentTime.getFullYear() + " | "
    + currentTime.getHours() + ":"
    + (currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes());
}