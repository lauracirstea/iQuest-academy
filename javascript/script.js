//-------------- Meniu ------------------

var menu = document.querySelector("#menu-bar");
menu.addEventListener('click', function() {
	document.querySelector("ul").classList.toggle("active");
});

// ------------------------ search ---------------------
function myFunction() {
    var input, filter, index, column, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    index = document.getElementsByClassName("index")[0];
    column = index.getElementsByClassName("column-item");
    for (i = 0; i < column.length; i++) {
        a = column[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            column[i].style.display = "";
        } else {
            column[i].style.display = "none";
        }
    }
}

// ------------------- sortare pret ----------------

window.onload = function() {
  document.querySelector('#sort').addEventListener("change", function() {
    var selectedValue = document.querySelector("#sort").value;

    if(selectedValue == 0) {
      ascending();
    } else {
      descending();
    }
  });
};

function ascending(){
  var items = [].slice.call(document.querySelectorAll(".column-item"));
  items.sort(function(a, b){
    return a.getAttribute('data-time') - b.getAttribute('data-time');
  });
  for(const item of items) {
    document.querySelector('.container').appendChild(item);
  }
}

function descending(){
  var items = [].slice.call(document.querySelectorAll(".column-item"));
  items.sort(function(a, b){
    return b.getAttribute('data-time') - a.getAttribute('data-time');
  });
  for(const item of items) {
    document.querySelector('.container').appendChild(item);
  }
}

// -------------- Checkout (adaugare, stergere item din cosul de comanda) --------------------

var removeCartItemButtons = document.querySelectorAll('.delete');
for(var i=0; i<removeCartItemButtons.length; i++) {
	var button = removeCartItemButtons[i];
	button.addEventListener('click', removeCartItem) 	
}

var quantityInputs = document.querySelectorAll('.cart-quantity-input');
for(var i=0; i<quantityInputs.length; i++) {
	var input = quantityInputs[i];
	input.addEventListener('change', quantityChanged);
}

var addToCartButton = document.querySelectorAll('.shop-item-button');
for(var i=0; i<addToCartButton.length; i++) {
	var button = addToCartButton[i];
	button.addEventListener('click', addToCartClicked);
}

document.querySelectorAll('.command-button')[0].addEventListener('click', commandClicked);

function commandClicked() {
  alert('Multumim pentru comanda plasata!');
  var cartItems = document.querySelectorAll('.cart-items')[0];
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
	var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.querySelectorAll('.shop-item-title')[0].innerText;
  var price = shopItem.querySelectorAll('.shop-item-price')[0].innerText;
  var imageSrc = shopItem.querySelectorAll('.shop-item-image')[0].getAttribute('src');
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.querySelectorAll('.cart-items')[0];
  var cartItemNames = cartItems.querySelectorAll('.cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('Produsul se afla deja in cosul de comanda!');
          return
      }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <br>
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column center-item">${price}</span>
    <div class="cart-quantity cart-column center-item">
        <input class="cart-quantity-input" type="number" value="1">
        <i class="fas fa-trash-alt delete"></i>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.querySelectorAll('.delete')[0].addEventListener('click', removeCartItem);
  cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
	var cartItemContainer = document.querySelectorAll('.cart-items')[0];
	var cartRows = cartItemContainer.querySelectorAll('.cart-row');
	var total = 0;
	for(var i=0; i<cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.querySelectorAll('.cart-price')[0];
		var quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0];
		var price = parseFloat(priceElement.innerText.replace('lei', ''));
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	document.querySelectorAll('.cart-total-price')[0].innerText = total + ' lei';
}

// ----------- Modal comanda ---------------

var elementDesktop = document.querySelector("#checkout-desktop").querySelectorAll(".cart-items")[0];
var elementMobile = document.querySelector("#checkout-mobile").querySelectorAll(".cart-items")[0];

 if(window.innerWidth < 991.98) {
  elementDesktop.classList.add('cart-items-none');
  elementDesktop.classList.remove('cart-items');
  elementMobile.classList.add('cart-items');
  elementMobile.classList.remove('cart-items-none');
 } else {
  elementMobile.classList.add('cart-items-none');
  elementMobile.classList.remove('cart-items');
  elementDesktop.classList.add('cart-items');
  elementDesktop.classList.remove('cart-items-none');
 }



var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// ---------------- Filtru meniu--------------------------

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.querySelectorAll(".filter");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) 
    	AddClass(x[i], "show");
  	}
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
    	element.className += " " + arr2[i];
    }
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.querySelector("#myBtnFilter");
var btns = btnContainer.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.querySelectorAll(".active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
