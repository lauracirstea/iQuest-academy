// ------------- modal login -----------------
var modalLogin = document.querySelector('#myModalLogin');

var btnLogin = document.querySelector('#myBtnLogin');

var spanLogin = document.querySelectorAll('.modal_close')[0];

btnLogin.onclick = function() {
  modalLogin.style.display = "block";
}

spanLogin.onclick = function() {
  modalLogin.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
  }
}