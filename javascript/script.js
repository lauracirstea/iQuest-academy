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
  var sort = document.querySelector('#sort');
  if (sort) {
  sort.addEventListener("change", function() {
    var selectedValue = document.querySelector("#sort").value;

    if(selectedValue == 0) {
      ascending();
    } else {
      descending();
    }
  });
}
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
if (btnContainer) {
var btns = btnContainer.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.querySelectorAll(".active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}

//--------------------- JSON -----------------------

