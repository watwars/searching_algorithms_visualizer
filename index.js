//dom variables
const newArray = document.getElementById("generateArray");
const linearSearch = document.getElementById("linear");
const binarySearch = document.getElementById("binary");
const givenNum = document.getElementById("given-num").value;
const jumpSearch = document.getElementById("jump");

//for linear
const speed = 75;

//index number, increases each time to set timeout
let index = 0;

//for binary
const animationSpeed = 150;

window.onload = generate();

//display new array
newArray.addEventListener("click", () => {
  document.getElementById("main").innerHTML = "";
  generate();
  document.getElementById("given-num").value = "";
});

//do linear search
linearSearch.addEventListener("click", () => {
  checkInput();
  const element = document.querySelectorAll(".arr-element");
  console.log(element.length);
  const givenNum = document.getElementById("given-num").value;
  for (let i = 0; i < element.length; i++) {
    if (element[i].innerHTML != givenNum) {
      setTimeout(() => {
        element[i].classList.add("red");
      }, speed * i);
    }
    if (element[i].innerHTML == givenNum) {
      setTimeout(() => {
        element[i].classList.add("green");
      }, speed * i);
      break;
    }
  }
  setTimeout(() => {
    const found = document.querySelectorAll(".green");
    if (found.length == 0) {
      displayNotFound();
    }
  }, speed * element.length);
});

//do binary search
binarySearch.addEventListener("click", () => {
  checkInput();
  let arr = sort();
  realSort();
  binary();
  setTimeout(() => {
    const found = document.querySelectorAll(".green");
    if (found.length == 0) {
      displayNotFound();
    }
  }, 25 * arr.length + index * animationSpeed + 1000);
});

//do jump search
jumpSearch.addEventListener("click", () => {
  checkInput();
  let arr = sort();
  realSort();
  let result = jump(arr, givenNum);
  console.log(result)
});

//display the sorted array
function realSort() {
  const element = document.querySelectorAll(".arr-element");
  let arr = sort();
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      element[i].innerHTML = arr[i];
    }, 25 * i);
  }
}

//do the binary search
function binary() {
  const element = document.querySelectorAll(".arr-element");
  let arr = sort();
  setTimeout(() => {
    const givenNum = document.getElementById("given-num").value;
    let start = 0;
    let end = arr.length - 1;
    console.log(arr[end]);
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (Number(element[mid].innerHTML) == givenNum) {
        setTimeout(() => {
          element[mid].classList.add("green");
        }, animationSpeed * index);
        index++;
        break;
      } else if (Number(element[mid].innerHTML) < givenNum) {
        setTimeout(() => {
          element[mid].classList.add("red");
          start = mid + 1;
        }, animationSpeed * index);
        index++;
        start = mid + 1;
      } else {
        setTimeout(() => {
          element[mid].classList.add("red");
          end = mid - 1;
        }, animationSpeed * index);
        index++;
        end = mid - 1;
      }
    }
  }, 25 * arr.length);
}

function jump(arr, value) {
  var length = arr.length;
  var step = Math.floor(Math.sqrt(length));
  var index = Math.min(step, length) - 1;
  var lowerBound = 0;
  setTimeout(() => {
    while (arr[Math.min(step, length) - 1] < value) {
      lowerBound = step;
      step += step;
      if (lowerBound >= length) {
        return -1;
      }
    }
  
    var upperBound = Math.min(step, length);
    while (arr[lowerBound] < value) {
      lowerBound++;
      if (lowerBound == upperBound) {
        return -1;
      }
    }
    if (arr[lowerBound] == value) {
      return lowerBound;
    }
    return -1;
  }, 2500);
}

//returns a sorted array
function sort() {
  const element = document.querySelectorAll(".arr-element");
  let arr = [];
  for (let i = 0; i < element.length; i++) {
    arr.push(element[i].innerHTML);
  }
  arr.sort((a, b) => a - b);
  return arr;
}

//displays the random array on the screen
function generate() {
  let arr = array();
  for (let i = 0; i < arr.length; i++) {
    let p = document.createElement("p");
    p.classList.add("arr-element");
    p.innerHTML = arr[i];
    const main = document.getElementById("main");
    main.appendChild(p);
  }
}

//returns a random array
function array() {
  let arr = [];
  for (let i = 0; i < 1000000; i++) {
    const random = Math.floor(Math.random() * 1000);
    if (!arr.includes(random)) {
      arr.push(random);
    }
    if (arr.length == 108) {
      break;
    }
  }
  return arr;
}

//check if a value is inputed before doing the algorithm
function checkInput() {
  const givenNum = document.getElementById("given-num").value;
  if (givenNum == "") {
    document.getElementById("main").innerHTML = "";
    let classes = ["alert", "alert-danger"];
    const alert = document.getElementById("alert");
    alert.classList.add(...classes);
    alert.innerHTML = "You must enter a number";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

//displays not found if array does not contain input
function displayNotFound() {
  let classes = ["alert", "alert-danger"];
  const alert = document.getElementById("alert");
  alert.classList.add(...classes);
  alert.innerHTML = "Number not found";
}
