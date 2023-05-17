"use strict"

const userInfoDiv = document.getElementById("userInfo");
const userForm = document.getElementById("userForm");

const usernameInput = document.getElementById("username");
const userMaleRadioButton = document.getElementById("male");
const userFemaleRadioButton = document.getElementById("female");
const userOtherRadioButton = document.getElementById("other");
const userBirthDateInput = document.getElementById("birthdate");
const userBioInput = document.getElementById("bio");

let username, userGender, birthDate, bio;

function submitForm() {
  if (!validateForm()) {
    alert("Заповніть форму повністю!");
    return;
  }

  username = usernameInput.value;
  birthDate = userBirthDateInput.value;
  userGender = getUserGender()
  bio = userBioInput.value;

  console.log(username);
  userForm.hidden = true;
  userInfoDiv.innerHTML = `<p>${username}</p>
<p>${birthDate}</p>
<p>${userGender}</p>
<p>${bio}</p>`
}

function validateForm() {
  return !!(usernameInput.value &&
    userBirthDateInput.value && userBioInput.value);
}
function getUserGender() {
  if(userMaleRadioButton.checked) return userMaleRadioButton.value;
  if(userFemaleRadioButton.checked) return userFemaleRadioButton.value;
  if(userOtherRadioButton.checked) return userOtherRadioButton.value;
}