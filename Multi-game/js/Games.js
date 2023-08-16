//refeing to elements
let header = document.querySelector(".header-container");
let headList = document.querySelector("ul");

//calling display onload to show name
document.addEventListener("DOMContentLoaded", function () {
  display();
});

function display() {
  let storedName = localStorage.getItem("name");
  let name = "";
  for (let i = 0; i < storedName.length; i++) {
    if (storedName[i] == " ") break;
    if (i == 0) name += storedName[i].toUpperCase();
    else name += storedName[i];
  }
  let userName = document.createElement("h1");
  let userNameText = document.createTextNode("Welcome " + name + " 😃");
  userName.appendChild(userNameText);
  userName.classList.add("welcome");
  header.insertBefore(userName, headList);
}
