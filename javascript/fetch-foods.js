var foodObj = JSON.parse(list);	
var items = Object.values(foodObj);
var restaurantsObj = JSON.parse(restaurants);
var restaurants = Object.values(restaurantsObj);
var myEl = document.querySelector('.container');
var restaurantNameEl = document.querySelector('.restaurant-name'); 
var myString = "";

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

const result = foodObj.foods.find( restaurant => {
	return restaurant.restaurantId === parseInt(urlParams.id)
});	

var found = restaurants[0].find((el) => {
  return el.id === result.restaurantId;
});
restaurantNameEl.innerHTML= found.name

for(var i = 0; i < result.items.length; i++) {
	var element = result.items[i];
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
	