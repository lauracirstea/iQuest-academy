var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};


var urlParams = getParams(window.location.search);
filterFood(parseInt(urlParams.id));

function filterFood(restaurantId) {	
	var food = `http://localhost:3000/restaurants/${restaurantId}/foods`;
	var myEl = document.querySelector('.container');
	var myString = "";

	fetch(food)
  	.then(function(response) {
    	return response.json();
  	})
  	.then(function(myFood) {
	    for(var i = 0; i < myFood.length; i++) {
			var element = myFood[i];
			myString += `<div data-time="${element.price}" class="column-item filter ${element.category}">
							<article class="item">
								<a href="#" class="item-image">
									<div class="post-image">
										<img class="shop-item-image" src="${element.image}">
									</div>
								</a>
								<div class="post-content">
									<h4 class="shop-item-title">${element.name}</h4>
									<span class="price">Pret:
										<span class="shop-item-price">${element.price} lei</span>
									</span>
									<p class="ingredients">${element.ingredients}</p>
									<button class="shop-item-button">Comanada <i class="fas fa-shopping-basket"></i></button>
								</div>
							</article>
						</div>`
		}
		myEl.innerHTML = myString;
		document.querySelector("#myBtnFilter .all").click()

		// Query the items only after the fetch promise is resolved
		var addToCartButton = document.querySelectorAll('.shop-item-button');
		for(var i = 0; i < addToCartButton.length; i++) {
		  var button = addToCartButton[i];

		  // Attach a click event listener on each checkout button
		  button.addEventListener('click', addToCartClicked);
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
	});	
}