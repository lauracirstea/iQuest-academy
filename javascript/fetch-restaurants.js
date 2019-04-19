var restaurants = JSON.parse(restaurants);	
	var items = Object.values(restaurants);
	var myEl = document.querySelector('.index');
	var myString = "";

console.log(items);
	for(var i = 0; i < restaurants.items.length; i++) {
		var item = restaurants.items[i];
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