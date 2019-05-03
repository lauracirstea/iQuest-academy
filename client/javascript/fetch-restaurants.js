var selectedCity;
var citySelector = document.querySelector('#city-select');
citySelector.addEventListener("change", function() {
	selectedCity = document.querySelector("#city-select").value;
	selectedCity = parseInt(selectedCity);
	filterCities(selectedCity);
})

filterCities(1);

function filterCities(cityId) {
	var restaurants = `http://localhost:3000/city/${cityId}/restaurants`;
	var myEl = document.querySelector('.index');
	var myString = "";

	fetch(restaurants)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(myRest) {
	    for(var i = 0; i < myRest.length; i++) {
			var item = myRest[i];
			myString += `<div class="column-item">
						    <article class="item">
						    	<a href="restaurant.html?id=${item.id}" class="item-image">
							    	<div class="post-image">
							    		<img src="${item.image}">
							    	</div>
							    	<div class="post-content">
								    	<h4>${item.name}</h4>
									</div>
								</a>
							</article>
						</div>`
		}
		myEl.innerHTML = myString;
	});
}