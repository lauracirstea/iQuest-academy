var menu = document.getElementById('menu-bar');
menu.addEventListener('click', function() {
	document.querySelector("ul").classList.toggle("active");
});

// ----------------------------------

var removeCartItemButtons = document.getElementsByClassName('delete');
for(var i=0; i<removeCartItemButtons.length; i++) {
	var button = removeCartItemButtons[i];
	button.addEventListener('click', removeCartItem) 	
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input');
for(var i=0; i<quantityInputs.length; i++) {
	var input = quantityInputs[i];
	input.addEventListener('change', quantityChanged);
}

var addToCartButton = document.getElementsByClassName('shop-item-button');
for(var i=0; i<addToCartButton.length; i++) {
	var button = addToCartButton[i];
	button.addEventListener('click', addToCartClicked);
}

 document.getElementsByClassName('command-button')[0].addEventListener('click', commandClicked);

function commandClicked() {
    alert('Multumim pentru comanda plasata!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
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
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].getAttribute('src');   
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
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
    cartRow.getElementsByClassName('delete')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for(var i=0; i<cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
		var price = parseFloat(priceElement.innerText.replace('lei', ''));
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	document.getElementsByClassName('cart-total-price')[0].innerText = total + ' lei';
}

// ------------------------------------------

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filter");
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

var btnContainer = document.getElementById("myBtnFilter");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var elementDesktop = document.getElementById("checkout-desktop").getElementsByClassName("cart-items")[0];
var elementMobile = document.getElementById("checkout-mobile").getElementsByClassName("cart-items")[0];

 if(window.innerWidth < 991.98) {
 	elementDesktop.classList.add('cart-items-none');
 	elementDesktop.classList.remove('cart-items');
 	elementMobile.classList.add('cart-items');
 	elementMobile.classList.remove('cart-items-none');
 } else {
 	 	console.log(2)
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

// ------------------------------


