let btn = document.querySelector(".enter-btn");
let logcont = document.querySelector(".logo-container");
btn.addEventListener("click", storeName);

function storeName(e) {
  let name = document.querySelector(".name-text").value;
  let warn = document.querySelector(".warning");
  if (name === "" || name === " " || name === "  " || name === "   ") {
    warn.hidden = false;
    e.preventDefault();
  } else {
    warn.hidden = true;
    localStorage.setItem("name", name);
    document.querySelector(".name-text").value = "";

    //connecting to other html page
    window.location.href = "../html/Games.html";
  }
}
